//로그인 페이지
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  //에러 메세지 추가
  const [error, setError] = useState(null); 

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("로그인 시도:", id, pw);

    try {
    // 백엔드 서버로 로그인 정보 전송
    const response = await axios.post('http://localhost:8080/api/auth/login', {
      email: id,      // 사용자가 입력한 id를 DB의 email 필드에 매칭
      password: pw    // 비밀번호
    });

    // id/pw확인 추가
    if (response.status === 200) {
      const token = response.data.token || 'im-login-token'; 
      localStorage.setItem('token', token); 
      
      setError(null);
      alert("로그인에 성공했습니다!");
      window.location.href = '/'; // 메인으로 이동
    }
  } catch (error) {
    // 로그인 실패 처리 (ID/PW 불일치, 서버 에러 등)
    console.error("로그인 에러:", error);
    
    if (error.response && error.response.status === 401) {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    } else {
      setError("서버 연결에 실패했습니다. 다시 시도해주세요.");
    }
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      
      {/* 로고*/}
      <div className="text-center mb-10">
        <h1 className="text-6xl md:text-7xl font-bold text-gray-900 tracking-tight">
          Travel Mate
        </h1>
      </div>

      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
        
        {/*아이디 입력창 */}
        <div>
          <label className="block text-xs font-extrabold text-gray-800 mb-2 ml-1">ID</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full px-6 py-4 rounded-3xl bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-[#486284] transition text-gray-700 placeholder-gray-400"
            placeholder="아이디를 입력하세요"
          />
        </div>

        {/* 비밀번호 입력창 */}
        <div>
          <label className="block text-xs font-extrabold text-gray-800 mb-2 ml-1">PASSWORD</label>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="w-full px-6 py-4 rounded-3xl bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-[#486284] transition text-gray-700 placeholder-gray-400"
            placeholder="비밀번호를 입력하세요"
          />
          {/* 아이디/비번 찾기 */}
          <div className="text-right mt-3 mr-1">
            <a href="#" className="text-xs text-gray-400 hover:text-[#486284] transition">
              ID/PASSWORD 찾기
            </a>
          </div>
        </div>

        {/* 로그인 버튼 */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 bg-[#86CDF9] text-black text-xl font-extrabold rounded-3xl shadow-md hover:bg-[#5ABAF3] hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5"
            >
            로 그 인
          </button>
        </div>

        {/* 하단에 에러 메시지 표시 */}
        {error && (
         <div className="text-center text-red-600 font-bold mt-4">
           {error}
         </div>
        )}


        {/* 회원가입 링크 */}
        <div className="text-center text-xs text-gray-400 mt-6">
          처음 오셨나요?{' '}
          <span 
            className="font-bold cursor-pointer hover:underline text-[#486284]"
            onClick={() => navigate('/signup')}
          >
            회원가입
          </span>
        </div>

      </form>
    </div>
  );
}
