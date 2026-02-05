//회원가입 페이지
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() { 
  const navigate = useNavigate();

// 입력값 상태 관리 (아이디, 비번, 비번확인) 
  const [formData, setFormData] = useState({ id: '', password: '', confirmPassword: '', });
  //에러 메세지 추가
  const [error, setError] = useState(null);

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
  
  const handleSignup = async(e) => { 
    e.preventDefault();

// 입력값 검증 추가
if (!formData.id || !formData.password || !formData.confirmPassword) {
  setError("모든 필드를 입력해주세요."); 
  return;
}

// pw 확인 추가
if (formData.password !== formData.confirmPassword) {
  setError("비밀번호가 다릅니다. 다시 확인해주세요.");
  return;
}

try {
    // 백엔드 서버로 데이터 전송 
    const response = await axios.post('http://localhost:8080/api/auth/signup', {
      email: formData.id, 
      password: formData.password
    });

    // 회원가입 성공 처리
    if (response.status === 200 || response.status === 201) {
      setError(null);
      alert(`${formData.id}님 환영합니다! 로그인을 진행해주세요.`);
      navigate('/login');
    }
  } catch (error) {
    // 에러 처리 
    console.error("회원가입 요청 중 에러 발생:", error);
    setError(error.response?.data?.message || "서버 연결에 실패했습니다. 다시 시도해주세요.");
  }
};

return ( <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
  {/* 로고*/}
  <div className="text-center mb-12">
    <h1 className="text-6xl md:text-7xl font-bold text-gray-900 tracking-tighter">
      Travel Mate
    </h1>
  </div>

  <form onSubmit={handleSignup} className="w-full max-w-sm space-y-6">
    
    {/*아이디 입력 */}
    <div>
      <label className="block text-xs font-extrabold text-gray-800 mb-2 ml-1">ID</label>
      <input
        name="id"
        type="text"
        className="w-full px-6 py-4 rounded-3xl bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-[#86CDF9] transition text-gray-700 placeholder-gray-400"
        onChange={handleChange}
        placeholder="아이디를 입력하세요"
      />
    </div>

    {/*비밀번호 입력 */}
    <div>
      <label className="block text-xs font-extrabold text-gray-800 mb-2 ml-1">PASSWORD</label>
      <input
        name="password"
        type="password"
        className="w-full px-6 py-4 rounded-3xl bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-[#86CDF9] transition text-gray-700 placeholder-gray-400"
        onChange={handleChange}
        placeholder="비밀번호"
      />
    </div>

    {/*비밀번호 확인*/}
    <div>
      <label className="block text-xs font-extrabold text-gray-800 mb-2 ml-1">CONFIRM PASSWORD</label>
      <input
        name="confirmPassword"
        type="password"
        className="w-full px-6 py-4 rounded-3xl bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-[#86CDF9] transition text-gray-700 placeholder-gray-400"
        onChange={handleChange}
        placeholder="비밀번호를 한 번 더 입력하세요"
      />
    </div>

    {/* 회원가입 버튼 */}
    <div className="pt-2">
      <button
        type="submit"
        className="w-full py-4 bg-[#86CDF9] text-black text-xl font-extrabold rounded-3xl shadow-md hover:bg-[#5ABAF3] hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5"
      >
        회원가입
      </button>
    </div>

    {/*하단에 에러 메시지 표시 */}
    {error && (
      <div className="text-center text-red-600 font-bold mt-4">
        {error}
      </div>
    )}


    {/* 하단 링크 */}
    <div className="text-center text-xs text-gray-400 mt-6">
      이미 계정이 있으신가요?{' '}
      <span 
        className="font-bold cursor-pointer hover:underline text-[#486284]"
        onClick={() => navigate('/login')}
      >
        로그인
      </span>
    </div>

  </form>
</div>
);
}