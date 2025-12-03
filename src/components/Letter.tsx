import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Letter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center py-10 min-h-[800px] px-4">
      <div className="relative w-full max-w-3xl flex items-center justify-center md:-mt-60 -mt-80">
        {/* 스케치 스타일 봉투 */}
        <motion.div
          className="relative cursor-pointer group w-full"
          onClick={() => setIsOpen(true)}
          whileHover={!isOpen ? { scale: 1.05 } : {}}
          whileTap={!isOpen ? { scale: 0.95 } : {}}
        >
          <div className="md:w-[480px] md:h-80 w-[90%] h-[240px] mx-auto relative overflow-visible">
            {/* 봉투 몸통 - 하얀 배경 */}
            <div className="absolute inset-0 bg-white shadow-xl" style={{
              border: '3px solid #333',
              borderStyle: 'dashed',
            }}></div>

            {/* 봉투 덮개 - 삼각형 */}
            <motion.div
              className="absolute top-0 left-0 w-full md:h-40 h-28 bg-white z-20"
              style={{
                borderLeft: '3px dashed #333',
                borderRight: '3px dashed #333',
                borderTop: '3px dashed #333',
                clipPath: 'polygon(0 0, 50% 50%, 100% 0)',
                transformStyle: 'preserve-3d',
                transformOrigin: 'top center',
              }}
              animate={isOpen ? { rotateX: -180 } : { rotateX: 0 }}
              transition={isOpen ? { duration: 1, ease: "easeInOut" } : { duration: 1, ease: "easeInOut", delay: 1 }}
            ></motion.div>

            {/* 봉투 안쪽 삼각형 (뒷면) */}
            <div
              className="absolute top-0 left-0 w-full md:h-40 h-28 bg-gray-50 z-10"
              style={{
                clipPath: 'polygon(0 0, 50% 50%, 100% 0)',
              }}
            ></div>

            {/* 하트 스티커 - 봉투 열릴 때만 사라짐 */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                  className="absolute md:top-14 top-10 left-1/2 -translate-x-1/2 z-25"
                >
                  <svg className="md:w-[60px] md:h-[60px] w-[45px] h-[45px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill="#ff4444"
                      stroke="#333"
                      strokeWidth="1"
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 클릭 안내 텍스트 - 항상 표시 */}
            <div className="absolute md:bottom-12 bottom-6 left-0 right-0 flex items-center justify-center z-15">
              <div className="px-6 py-2" style={{
                fontFamily: 'cursive',
                fontSize: 'clamp(16px, 4vw, 20px)',
                color: '#ff4444',
                textShadow: '1px 1px 0px rgba(0,0,0,0.1)',
              }}>
              Open Me!
              </div>
            </div>

            {/* 호버 효과 */}
            {!isOpen && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-yellow-50/30 transition-all duration-300"></div>
            )}
          </div>
        </motion.div>

        {/* 편지지 - 위에서 중앙으로 내려오는 애니메이션 */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: -300, scale: 0.7, opacity: 0 }}
              animate={{ y: -200, scale: 1, opacity: 2 }}
              exit={{ y: -200, scale: 0.7, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl z-30"
            >
              {/* 스케치 스타일 편지지 */}
              <div className="relative md:p-12 p-6 rounded bg-white shadow-2xl overflow-hidden max-h-[70vh] overflow-y-auto" style={{
                border: '2px solid #333',
                borderStyle: 'solid',
              }}>
                {/* 노트 줄 무늬 */}
                <div className="absolute inset-0" style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 29px, #e8e8e8 29px, #e8e8e8 30px)',
                  marginTop: '60px',
                }}></div>

                {/* 왼쪽 빨간 세로선 */}
                <div className="absolute md:left-12 left-6 top-0 bottom-0 w-0.5 bg-red-400" style={{
                  opacity: 0.3,
                }}></div>

                {/* 편지 내용 */}
                <div className="relative z-10">
                  <p className="leading-loose text-gray-800 md:text-lg text-sm" style={{
                    fontFamily: 'GangwonEducationModuche, cursive',
                  }}>
                    <span className="md:text-2xl text-xl font-bold text-gray-900 block mb-5 pb-2">진갈매기 선생님께</span>
                    <br/>
                   올해는 특별한 선물을 드리고싶어서 이렇게 직접 홈페이지 만들면서 이것저것 생각이 많아져서 편지 한 번 써봅니다.<br/>
                    <br/>
                    제대한후에 개발자 일해보겠다고 이것저것 배워가면서<br/>
                    1~2년동안 공부랑 취업준비한다고 제대 하고도 어디 못갔네요<br/>

                    내년에는 같이 여행도 가고 맛있는 것도 많이 먹으러 다녀요!😊<br/>
                    <br/>
                  
                   항상 저를 믿고 응원해주셔서 제가 이렇게 잘 성장 할 수 있었던거 같아요 
                   앞으로도 더 열심히 해서 맛있는것도 많이 사드리고 호강 시켜드릴게요 !! 👍🏻
                    <br/>
                    진심으로 생신 축하드리고 앞으로도 건강 잘 챙기면서 행복한 일만 가득하길 바래요.<br/>
                   
                    <br/>
                    그리고 사실 이런 말 평소엔 안 하지만, 항상 감사하고 존경합니다.
                    <br/>
                    <br/>
                    <br/>



                    - 귀염둥이 막내아들 진성오 드림 -
                  </p>

                  {/* 닫기 버튼 */}
                  <div className="flex justify-end">

                  <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(false);
                    }}
                    className="mt-10 rounded md:px-8 px-6 md:py-2 py-1.5 bg-white hover:bg-gray-50 text-gray-800 md:text-lg text-base font-bold transition-all duration-300"
                    style={{
                        border: '2px solid #333',
                        fontFamily: 'GangwonEducationModuche, cursive',
                    }}
                    >
                    닫기
                  </button>
                      </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
