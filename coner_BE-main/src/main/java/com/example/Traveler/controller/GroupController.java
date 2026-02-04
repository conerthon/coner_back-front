package com.example.Traveler.controller;

import com.example.Traveler.domain.TravelGroup;
import com.example.Traveler.domain.User;
import com.example.Traveler.dto.GroupRequest;
import com.example.Traveler.dto.GroupResponse;
import com.example.Traveler.service.GroupService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List; // [추가됨]

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    // 그룹 생성
    @PostMapping
    public ResponseEntity<?> createGroup(
            @RequestBody GroupRequest.Create request,
            HttpSession session) {

        User loginUser = (User) session.getAttribute("loginUser");
        if (loginUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요한 서비스입니다.");
        }

        TravelGroup group = groupService.createGroup(request.getGroupName(), loginUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(new GroupResponse(group));
    }

    // 그룹 초대(가입)
    @PostMapping("/join")
    public ResponseEntity<String> joinGroup(
            @RequestBody GroupRequest.Join request,
            HttpSession session) {
        User loginUser = (User) session.getAttribute("loginUser");
        if (loginUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요한 서비스입니다.");
        }

        try {
            groupService.joinGroup(request.getInviteCode(), loginUser);
            return ResponseEntity.ok("성공적으로 그룹에 참여했습니다.");
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // [추가] 내 그룹 목록 조회
    @GetMapping("/my")
    public ResponseEntity<List<GroupResponse>> getMyGroups(HttpSession session) {
        User loginUser = (User) session.getAttribute("loginUser");

        // 로그인 안 되어 있으면 401 에러
        if (loginUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // 서비스 호출해서 결과 반환
        return ResponseEntity.ok(groupService.getMyGroups(loginUser));
    }
}