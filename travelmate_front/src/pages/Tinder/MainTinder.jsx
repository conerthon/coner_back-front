import { useState, useEffect } from "react";
import SwipeCard from "./SwipeCard";
import axios from "axios";

// groupId를 부모 컴포넌트(App.jsx 등)에서 props로 꼭 넘겨줘야 합니다!
export default function MainTinder({ cardList, groupId }) {
  
  // 1. 객체 전체를 저장하도록 변경 (id, imageUrl 등 모두 포함)
  const [cards, setCards] = useState([]);
  
  // 결과 저장을 위한 상태
  const [keptCards, setKeptCards] = useState([]);
  const [deletedCards, setDeletedCards] = useState([]);

  // 초기화: cardList를 그대로 상태에 저장
  useEffect(() => {
    if (cardList && cardList.length > 0) {
      setCards(cardList); 
    }
  }, [cardList]);

  // 2. ▼▼▼ 서버로 투표 전송하는 함수 ▼▼▼
  const sendVote = async (placeId, isLike) => {
    try {
      // API 경로: /api/groups/{groupId}/places/{placeId}/vote
      // groupId가 없다면 테스트용으로 1 등을 하드코딩해서 넣어보세요.
      const currentGroupId = groupId || 1; 

      await axios.post(`/api/groups/${currentGroupId}/places/${placeId}/vote`, {
        isLike: isLike
      }, {
        withCredentials: true // 세션 쿠키(JSESSIONID) 전달을 위해 필수
      });
      
      console.log(`투표 성공! ID: ${placeId}, 좋아요: ${isLike}`);

    } catch (error) {
      console.error("투표 전송 실패:", error);
      // 에러 처리가 필요하면 여기에 작성 (예: alert 띄우기)
    }
  };

  // 3. 스와이프 핸들러 수정
  const handleSwipe = (direction) => {
    const currentCard = cards[0]; // 현재 카드 객체

    if (!currentCard) return;

    // 오른쪽(Right) = 좋아요(True), 왼쪽(Left) = 싫어요(False)
    const isLike = direction === "right";

    // ▼ 서버로 데이터 전송
    // currentCard.id 혹은 currentCard.placeId (백엔드에서 오는 필드명에 맞춰 수정하세요)
    const placeId = currentCard.id || currentCard.placeId; 
    sendVote(placeId, isLike);

    if (direction === "left") {
      setDeletedCards((prev) => [...prev, currentCard]);
      console.log("❌ 삭제됨:", currentCard);
    } else {
      setKeptCards((prev) => [...prev, currentCard]);
      console.log("💚 유지됨:", currentCard);
    }

    // 다음 카드로 넘어감
    setCards((prev) => prev.slice(1));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      
      {/* 상단 상태판 */}
      <div className="flex gap-6 mb-4 text-sm font-bold text-gray-500">
        <span className="text-red-400">삭제: {deletedCards.length}</span>
        <span>남음: {cards.length}</span>
        <span className="text-green-500">유지: {keptCards.length}</span>
      </div>

      <h1 className="text-5xl font-extrabold mb-2">TINDER FOR TRAVEL</h1>
      <p className="text-gray-500 mb-8">
        싸우지 말고, 스와이프로 결정하세요!
      </p>

      <div className="relative w-[320px] h-[200px] md:w-[520px] md:h-[320px]">
        
        {cards.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-[30px] border-2 border-dashed border-gray-300 animate-fade-in p-6 overflow-y-auto">
            <p className="text-xl font-bold text-gray-800 mb-4">결과 확인 🎉</p>
            
            <div className="w-full space-y-4">
              {/* 유지된 목록 */}
              <div>
                <h3 className="text-green-600 font-bold mb-2">💚 맘에 든 곳 ({keptCards.length})</h3>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {keptCards.length === 0 ? <span className="text-xs text-gray-400">없음</span> : 
                    keptCards.map((item, idx) => (
                      <img key={idx} src={item.imageUrl} className="w-12 h-12 rounded-lg object-cover border border-green-200" alt="kept" />
                    ))
                  }
                </div>
              </div>

              {/* 삭제된 목록 */}
              <div>
                <h3 className="text-red-500 font-bold mb-2">❌ 삭제한 곳 ({deletedCards.length})</h3>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {deletedCards.length === 0 ? <span className="text-xs text-gray-400">없음</span> :
                    deletedCards.map((item, idx) => (
                      <img key={idx} src={item.imageUrl} className="w-12 h-12 rounded-lg object-cover border border-red-200 opacity-60" alt="deleted" />
                    ))
                  }
                </div>
              </div>
            </div>

            <button 
              onClick={() => window.location.reload()} 
              className="mt-6 px-6 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition"
            >
              다시 하기
            </button>
          </div>
        ) : (
          /* 카드 영역 */
          <>
            {/* 다음 카드 (cards[1]) */}
            {cards[1] && (
              <img
                src={cards[1].imageUrl} // 객체이므로 .imageUrl로 접근해야 함
                alt="next"
                className="absolute top-4 left-0 w-full h-full object-cover rounded-[30px] opacity-50 scale-95 transition-all duration-300"
                style={{ zIndex: 0 }}
              />
            )}

            {/* 현재 카드 (cards[0]) */}
            {cards[0] && (
              <div className="absolute inset-0 z-10">
                 <SwipeCard 
                    key={cards[0].id || cards[0].placeId} // 고유 key 사용 권장
                    image={cards[0].imageUrl} // 이미지 URL 문자열만 넘겨줌
                    onSwipe={handleSwipe} 
                 />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}