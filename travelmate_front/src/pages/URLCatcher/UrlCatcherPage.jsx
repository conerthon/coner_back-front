import React, { useState } from 'react';
import FavoritePictureSlideBar from './FavoritePictureSlideBar';
import Detail from './detail';
import DeleteOption from './deleteOption';

import busanImg from '../../assets/images/url/busanImg.jpg';
import cafeImg from '../../assets/images/url/cafeImg.JPG'; 
import haemokImg from '../../assets/images/url/haemokImg.jpg';



const UrlCatcherPage = ({ cardList, setCardList }) => {
  const [url, setUrl] = useState('');
  // 데이터가 있으면 항상 슬라이드바가 보이도록 초기값을 cardList 존재 여부로 설정 가능합니다.
  const [isSubmitted, setIsSubmitted] = useState(cardList.length > 0);
  const [selectedItem, setSelectedItem] = useState(null); 
  const [showDelete, setShowDelete] = useState(false);

  const handleChange = (e) => setUrl(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim() === "") return alert("URL을 입력해주세요!");

    // 시연용 더미 데이터 풀 (Schedule과 Detail 컴포넌트 필드에 완벽 대응)
    const demoPool = [
      {
        id: 101,
        title: "광안리 해수욕장",
        imageUrl: busanImg,
        tags: ["#부산", "#광안대교", "#야경명소"], // Detail.jsx의 tags.map 에러 방지
        votes: [], // Schedule.jsx의 투표 계산용
        users: []  // 투표 인원 계산용
      },
      {
        id: 102,
        title: "해운대 해목",
        imageUrl:haemokImg,
        tags: ["#해운대", "#장어덮밥", "#맛집추천"],
        votes: [],
        users: []
      },
      {
        id: 103,
        title: "웨이브온 커피",
        imageUrl:cafeImg,
        tags: ["#기장카페", "#오션뷰", "#인생샷"],
        votes: [],
        users: []
      }
    ];

    // 현재 리스트 길이에 맞춰 다음 데이터를 순차적으로 선택
    const nextData = { ...demoPool[cardList.length % demoPool.length], id: Date.now() };

    // 상태 업데이트
    const newList = [...cardList, nextData];
    setCardList(newList);
    setIsSubmitted(true);
    setUrl('');

    // 마이페이지 및 스케줄 연동을 위해 로컬 스토리지 저장
    localStorage.setItem('cardList', JSON.stringify(newList));
  };

  const handleCardClick = (item) => setSelectedItem(item);

  const closeDetail = () => {
    setSelectedItem(null);
    setShowDelete(false);
  };

  const confirmDelete = () => {
    const updatedList = cardList.filter(card => card.id !== selectedItem.id);
    setCardList(updatedList);
    localStorage.setItem('cardList', JSON.stringify(updatedList));
    setShowDelete(false);
    setSelectedItem(null);
    alert("삭제되었습니다.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 relative">
      <div className="text-center mb-8 mt-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tighter mb-2">URL CATCHER</h1>
        <p className="text-gray-400 text-sm md:text-base">링크를 복사 붙여넣기 하세요. AI가 모두 정리해드립니다.</p>
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

      {/* 이미 데이터가 있거나 방금 제출했다면 슬라이드바 표시 */}
      {(isSubmitted || cardList.length > 0) && (
        <div className="w-full max-w-6xl animate-fade-in-up">
          <FavoritePictureSlideBar 
            list={cardList} 
            onItemClick={handleCardClick} 
            selectedItem={selectedItem} 
          />
        </div>
      )}

      {selectedItem && (
        <Detail item={selectedItem} onClose={closeDetail} onDeleteRequest={() => setShowDelete(true)} />
      )}

      {showDelete && <DeleteOption onClose={() => setShowDelete(false)} onConfirm={confirmDelete} />}
    </div>
  );
};

export default UrlCatcherPage;