import React, { useState } from 'react';
import FavoritePictureSlideBar from './FavoritePictureSlideBar';
import Detail from './detail';
import DeleteOption from './deleteOption';

import busanImg from '../../assets/images/url/busanImg.jpg';
import cafeImg from '../../assets/images/url/cafeImg.JPG'; 
import haemokImg from '../../assets/images/url/haemokImg.jpg';
import blueline from '../../assets/images/url/blueline.jpg';
import gamcheon from '../../assets/images/url/gamcheon.jpg';

const UrlCatcherPage = ({ cardList, setCardList }) => {
  const [url, setUrl] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(cardList.length > 0);
  const [selectedItem, setSelectedItem] = useState(null); 
  const [showDelete, setShowDelete] = useState(false);

  const handleChange = (e) => setUrl(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim() === "") return alert("URL을 입력해주세요!");

    let selectedData = null;

    // URL 키워드 매칭 
    if (url.includes("busan") || url.includes("attraction")) {
      selectedData = {
        title: "광안리 해수욕장",
        imageUrl: busanImg,
        tags: ["#부산", "#광안대교", "#야경명소"],
      };
    } else if (url.includes("haemok") || url.includes("restaurant")) {
      selectedData = {
        title: "해운대 해목",
        imageUrl: haemokImg,
        tags: ["#해운대", "#장어덮밥", "#맛집추천"],
      };
    } else if (url.includes("cafe") || url.includes("waveoncoffee")) {
      selectedData = {
        title: "웨이브온 커피",
        imageUrl: cafeImg,
        tags: ["#기장카페", "#오션뷰", "#인생샷"],
      };
    } else if (url.includes("train") || url.includes("blueline")) { 
      selectedData = {
        title: "해운대 블루라인파크",
        imageUrl: blueline, 
        tags: ["#해변열차", "#스카이캡슐", "#바다뷰"],
      };
    } else if (url.includes("village") || url.includes("gamcheon")) { 
      selectedData = {
        title: "감천문화마을",
        imageUrl: gamcheon, 
        tags: ["#어린왕자", "#벽화마을", "#부산포토존"],
      };
    } else {
      return alert("분석할 수 없는 URL입니다.");
    }

    // 공통 필드 결합
    const nextData = {
      ...selectedData,
      id: Date.now(),
      votes: [],
      users: []
    };

    // 상태 업데이트 및 저장
    const newList = [...cardList, nextData];
    setCardList(newList);
    setIsSubmitted(true);
    setUrl('');
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