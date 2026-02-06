import React, { useState } from 'react';
import VoteInfo from './VoteInfo';
import Survival from './Survival';

// cardList를 받아옴
const Schedule = ({ cardList =[]}) => {
  const [sortType, setSortType] = useState('latest'); 

  const getSortedData = () => {
    const dataCopy = [...cardList]; 
    if (sortType === 'latest') {
      return dataCopy.sort((a, b) => b.id - a.id); // 최신순(id 역순)
    } else {
      // 투표순
      return dataCopy.sort((a, b) => {
        const aLikes = a.votes?.filter(v => v.isLike).length || 0;
        const bLikes = b.votes?.filter(v => v.isLike).length || 0;
        return bLikes - aLikes;
      });
    }
  };

  const sortedData = getSortedData();

  // ▼▼▼ DB 구조(Vote 테이블 is_like)와 호환되는 로직 , 인원수 생존 규칙도 적용 ▼▼▼

  const totalVoters = new Set(cardList.flatMap(card => card.users || [])).size || (cardList.some(c => c.votes?.length > 0) ? 1 : 0); //참여 인원 ->  user_id 리스트의 중복을 제거해서 셈

  // 생존 장소
  const checkSurvival = (card) => {
    // 해당 카드의 좋아요 개수 계산
    const likeVotes = card.votes?.filter(v => v.isLike === true).length || 0;

    // [수정] 투표 인원이 1명일 때는 1표만 있어도 생존으로 인정합니다.
    if (totalVoters <= 1) return likeVotes >= 1; 

    // 2명 이상일 때의 규칙 (기존 유지)
    if (totalVoters === 2) return likeVotes === 2;
    return likeVotes >= (totalVoters / 2);
  };

  // checkSurvival 통과 시 생존
  const survivedList = cardList.filter(card => checkSurvival(card));
  const survivedCount = survivedList.length;

  // 통과 못하면 탈락
  const eliminatedList = cardList.filter(card => !checkSurvival(card)); 
  const eliminatedCount = eliminatedList.length;



  return (
    <div className="min-h-screen pb-20 font-sans">

      <div className="max-w-7xl mx-auto px-6 mt-10">
        
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-wide mb-2">SCHEDULE</h1>
          <p className="text-gray-400 text-sm md:text-base font-medium ">오늘의 일정을 확인하세요.</p>
        </div>

        {/* VoteInfo */}
        <VoteInfo 
          survivedCount={survivedCount}
          eliminatedCount={eliminatedCount}    
          totalVoters={totalVoters}
        />

        {/* Survival 정렬 */}
        <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Survival</h2>
          <div className="flex gap-4 text-sm font-medium">
            <button 
              onClick={() => setSortType('latest')}
              className={`pb-1 transition-colors ${sortType === 'latest' ? 'text-[#86CDF9] border-b-2 border-[#86CDF9]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              최신순
            </button>
            <span className="text-gray-300">|</span>
            <button 
              onClick={() => setSortType('votes')}
              className={`pb-1 transition-colors ${sortType === 'votes' ? 'text-[#86CDF9] border-b-2 border-[#86CDF9]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              투표순
            </button>
          </div>
        </div>

        {/* Survaival 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {survivedList.length > 0 ? (
            survivedList.map((item) => (
              <Survival key={item.id} item={item} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-400">
              아직 등록된 일정이 없습니다. URL Catcher에서 추가해보세요!
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Schedule;