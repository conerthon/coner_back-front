//urlcapture기본 화면
import React, { useState } from 'react';
import FavoritePictureSlideBar from './FavoritePictureSlideBar';
import Detail from './detail';
import DeleteOption from './deleteOption';

const UrlCatcherPage = () => {
  const [url, setUrl] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // 장소 이름(title), 태그(tags) 포함된 객체로 관리 
  // 일단 더미데이터
  const [cardList, setCardList] = useState([
    {
      id: 1,
      title: "경주 첨성대",
      description: "신라 시대의 천문 관측소, 밤에 보면 더 예쁘다.",
      tags: ["#경주", "#역사", "#야경"],
      imageUrl: "https://images.unsplash.com/photo-1499856871940-a09627c6d7db?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      title: "베니스 운하",
      description: "물이 흐르는 도시, 곤돌라 체험 필수.",
      tags: ["#이탈리아", "#낭만", "#물"],
      imageUrl: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      title: "그리스 산토리니",
      description: "파란 지붕과 하얀 벽, 인생샷 명소.",
      tags: ["#그리스", "#바다", "#휴양"],
      imageUrl: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=500&auto=format&fit=crop&q=60"
    },
  ]);

  // 카드 정보 저장
  const [selectedItem, setSelectedItem] = useState(null); 
  const [showDelete, setShowDelete] = useState(false);

  const handleChange = (e) => setUrl(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim() === "") return alert("URL을 입력해주세요!");
    
    // 나중에 여기에 axios.post(...) 코드가 들어갑니다.
    // 백엔드가 AI로 분석해서 준 데이터를 setCardList([...cardList, response.data])
    console.log("서버로 URL 전송:", url);
    setIsSubmitted(true);
  };

  // 하단 카드 클릭 -> 해당 객체 전체를 선택
  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const closeDetail = () => {
    setSelectedItem(null);
    setShowDelete(false);
  };

  const requestDelete = () => {
    setShowDelete(true);
  };

  const confirmDelete = () => {
    // id를 기준 삭제
    setCardList(cardList.filter(card => card.id !== selectedItem.id));
    setShowDelete(false);
    setSelectedItem(null);
    alert("삭제되었습니다.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 relative">
      
      <div className="text-center mb-8 mt-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tighter mb-2">
          URL CATCHER
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          링크를 복사 붙여넣기 하세요. AI가 모두 정리해드립니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mb-12">
        <input
          type="text"
          value={url}
          onChange={handleChange}
          placeholder="https://..."
          className="w-full py-4 pl-6 pr-14 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#86CDF9] transition text-gray-700"
        />
        <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      {/* 슬라이드바 */}
      {isSubmitted && (
        <div className="w-full max-w-6xl animate-fade-in-up">
          <FavoritePictureSlideBar 
            list={cardList} 
            onItemClick={handleCardClick} 
            selectedItem={selectedItem} //선택된 아이템 정보 전달, 해당카드 블러처리 위해
          />
        </div>
      )}

      {/* 디테일,삭제 창 */}
      {selectedItem && (
        <Detail 
          item={selectedItem} 
          onClose={closeDetail} 
          onDeleteRequest={requestDelete} 
        />
      )}

      {showDelete && (
        <DeleteOption 
          onClose={() => setShowDelete(false)} 
          onConfirm={confirmDelete} 
        />
      )}

    </div>
  );
};

export default UrlCatcherPage;