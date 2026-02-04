import { useState, useRef } from "react";

export default function SwipeCard({ image, onSwipe }) {
  const [offsetX, setOffsetX] = useState(0);       // 카드의 x축 이동값
  const [isDragging, setIsDragging] = useState(false); // 드래그 중인지 여부
  const startX = useRef(0);                        // 드래그 시작 지점
  const hasSwiped = useRef(false);                 // ✅ 이미 스와이프 처리됐는지 체크
  const threshold = 120;                           // 좌/우 판정 기준값

  // 마우스를 눌렀을 때 (드래그 시작)
  const handleMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.clientX;
    hasSwiped.current = false; // 🔁 새로운 카드가 렌더될 때마다 초기화
  };

  // 마우스를 움직일 때 (카드 이동)
  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const diff = e.clientX - startX.current; // 이동한 거리
    setOffsetX(diff);
  };

  // 마우스를 놓았을 때 (좌/우 판정)
  const handleMouseUp = () => {
    if (!isDragging) return;          // ✅ 드래그 중일 때만 처리
    if (hasSwiped.current) return;    // ✅ 이미 처리했으면 중복 실행 방지

    setIsDragging(false);

    // 왼쪽으로 충분히 밀었을 때 → 삭제
    if (offsetX < -threshold) {
      hasSwiped.current = true;       // 🚫 이후 중복 실행 막기
      setOffsetX(-window.innerWidth); // 화면 밖으로 날려버리기
      setTimeout(() => onSwipe("left"), 200);
      return;
    }

    // 오른쪽으로 충분히 밀었을 때 → 유지
    if (offsetX > threshold) {
      hasSwiped.current = true;       // 🚫 이후 중복 실행 막기
      setOffsetX(window.innerWidth);  // 화면 밖으로 날려버리기
      setTimeout(() => onSwipe("right"), 200);
      return;
    }

    // 애매하면 원위치
    setOffsetX(0);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}  // ⚠️ 그래도 중복 호출 방지됨
      className="absolute w-full h-full cursor-grab active:cursor-grabbing"
      style={{
        transform: `translateX(${offsetX}px) rotate(${offsetX / 20}deg)`,
        transition: isDragging ? "none" : "transform 0.3s ease",
      }}
    >
      {/* 메인 이미지 */}
      <img
        src={image}
        alt=""
        className="w-full h-full object-cover rounded-3xl shadow-xl select-none"
        draggable={false}
      />

      {/* 왼쪽으로 밀 때: 삭제(빨간 오버레이) */}
      {offsetX < -30 && (
        <div className="absolute inset-0 bg-red-500/40 rounded-3xl flex items-center justify-center">
          <span className="text-white text-2xl font-bold rotate-[-15deg]">
            DELETE ❌
          </span>
        </div>
      )}

      {/* 오른쪽으로 밀 때: 유지(초록 오버레이) */}
      {offsetX > 30 && (
        <div className="absolute inset-0 bg-green-500/40 rounded-3xl flex items-center justify-center">
          <span className="text-white text-2xl font-bold rotate-[15deg]">
            KEEP 💚
          </span>
        </div>
      )}
    </div>
  );
}
