import React, { useState } from 'react';
import FavoritePictureSlideBar from './FavoritePictureSlideBar';
import Detail from './detail';
import DeleteOption from './deleteOption';
import axios from 'axios';

// App.jsx에서 cardList와 setCardList를 props로 받아옵니다.
const UrlCatcherPage = ({ cardList, setCardList }) => {
  const [url, setUrl] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // 기존에 있던 cardList useState는 제거했습니다. (App.jsx로 이동됨)

  // 카드 정보 저장
  const [selectedItem, setSelectedItem] = useState(null); 
  const [showDelete, setShowDelete] = useState(false);

  const handleChange = (e) => setUrl(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (url.trim() === "") return alert("URL을 입력해주세요!");

    try {
      // 백엔드로  전송
      const response = await axios.post('http://localhost:8080/api/places/capture', { 
        url: url,
        userId: 1,
        groupId: 1  
      }, {
        withCredentials: true
      }
    );
    
    // 서버 응답 성공 시 
      if (response.status === 200 || response.status === 201) {
        // 백엔드가 준 장소 데이터를 리스트에 추가
        setCardList([...cardList, response.data]);
        setIsSubmitted(true);
        setUrl(''); // 입력창 초기화
      }
    } catch (error) {
      // 예외 처리: 실제로 없는 URL이거나 서버에서 정보를 못 가져올 때
      console.error("URL Catcher 에러:", error);

      if (error.response && error.response.status === 404) {
        // 없는 URL임을 사용자에게 알림
        alert("실제로 존재하지 않는 URL입니다. 정확한 주소를 입력해주세요!");
      } else {
        alert("서버 연결에 실패했거나 AI 분석 중 오류가 발생했습니다.");
      }
    }
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
    // props로 받은 setCardList와 cardList를 사용하여 삭제 로직 수행
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
            list={cardList}  // 부모에게서 받은 리스트 전달
            onItemClick={handleCardClick} 
            selectedItem={selectedItem} // 선택된 아이템 정보 전달 (블러 처리용)
          />
        </div>
      )}

      {/* 디테일, 삭제 창 */}
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