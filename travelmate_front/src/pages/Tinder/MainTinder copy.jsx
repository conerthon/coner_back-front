import { useState, useEffect } from "react";
import SwipeCard from "./SwipeCard";

export default function MainTinder({ cardList, setCardList, groupId }) {
  // 1. 현재 보여줄 카드 목록 (이미지 주소들)
  const [cards, setCards] = useState([]);
  //추가-카드 이름 목록
  const [cardNames, setcardNames]=useState([]);
  
  // 2. ▼▼▼ 결과 저장을 위한 상태 추가 ▼▼▼
  const [keptCards, setKeptCards] = useState([]);     // 유지(Right)된 카드들
  const [deletedCards, setDeletedCards] = useState([]); // 삭제(Left)된 카드들

  // 부모(App.jsx)에서 데이터 받아서 초기화
  useEffect(() => {
    if (cardList && cardList.length > 0) {
      const images = cardList.map((item) => item.imageUrl);
      setCards(images);
    }
  }, [cardList]);

  // 3. ▼▼▼ 스와이프 핸들러 수정 (기록 저장) ▼▼▼
  const handleSwipe = (direction) => {
    const currentCard = cards[0]; // 현재 처리 중인 카드
    if (!currentCard) return;

    const isLike = direction === "right";
    const placeId = currentCard.id || currentCard.placeId;

    // 1. 서버 전송 (기존 유지)
    sendVote(placeId, isLike);

    // 2. [핵심] Schedule 페이지와 연동되도록 부모의 cardList를 업데이트합니다.
    if (setCardList) {
      setCardList(prevList => prevList.map(card => {
        if (card.id === placeId) {
          return {
            ...card,
            // Schedule.jsx의 totalVoters와 checkSurvival이 인식하는 구조
            votes: [{ isLike: isLike, userId: 1 }], 
            users: [1] // 투표 인원 계산용
          };
        }
        return card;
      }));
    }


    if (direction === "left") {
      // 삭제 목록에 추가
      setDeletedCards((prev) => [...prev, currentCard]);
      console.log("❌ 삭제됨:", currentCard);
    } else {
      // 유지 목록에 추가
      setKeptCards((prev) => [...prev, currentCard]);
      console.log("💚 유지됨:", currentCard);
    }

    // 다음 카드로 넘어감
    setCards((prev) => prev.slice(1));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      
      {/* 4. ▼▼▼ 상단 상태판 (남은 카드, 유지, 삭제 개수 표시) ▼▼▼ */}
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
        
        {/* 카드가 다 떨어졌을 때 결과 화면 */}
        {cards.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-[30px] border-2 border-dashed border-gray-300 animate-fade-in p-6 overflow-y-auto">
            <p className="text-xl font-bold text-gray-800 mb-4">결과 확인 🎉</p>
            
            {/* 결과 요약 */}
            <div className="w-full space-y-4">
              {/* 유지된 목록 */}
              <div>
                <h3 className="text-green-600 font-bold mb-2">💚 맘에 든 곳 ({keptCards.length})</h3>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {keptCards.length === 0 ? <span className="text-xs text-gray-400">없음</span> : 
                    keptCards.map((img, idx) => (
                      <img key={idx} src={img} className="w-12 h-12 rounded-lg object-cover border border-green-200" alt="kept" />
                    ))
                  }
                </div>
              </div>

              {/* 삭제된 목록 */}
              <div>
                <h3 className="text-red-500 font-bold mb-2">❌ 삭제한 곳 ({deletedCards.length})</h3>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {deletedCards.length === 0 ? <span className="text-xs text-gray-400">없음</span> :
                    deletedCards.map((img, idx) => (
                      <img key={idx} src={img} className="w-12 h-12 rounded-lg object-cover border border-red-200 opacity-60" alt="deleted" />
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
            {cards[1] && (
              <img
                src={cards[1]}
                alt="next"
                className="absolute top-4 left-0 w-full h-full object-cover rounded-[30px] opacity-50 scale-95 transition-all duration-300"
                style={{ zIndex: 0 }}
              />
            )}

            {cards[0] && (
              <div className="absolute inset-0 z-10">
                 <SwipeCard 
                    key={cards[0]} 
                    image={cards[0]} 
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
