import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Letter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center py-10 min-h-[800px]">
      <div className="relative w-full max-w-3xl flex items-center justify-center -mt-60">
        {/* 스케치 스타일 봉투 */}
        <motion.div
          className="relative cursor-pointer group"
          onClick={() => setIsOpen(true)}
          whileHover={!isOpen ? { scale: 1.05 } : {}}
          whileTap={!isOpen ? { scale: 0.95 } : {}}
        >
          <div className="w-[480px] h-80 relative overflow-visible">
            {/* 봉투 몸통 - 하얀 배경 */}
            <div className="absolute inset-0 bg-white shadow-xl" style={{
              border: '3px solid #333',
              borderStyle: 'dashed',
            }}></div>

            {/* 봉투 덮개 - 삼각형 */}
            <motion.div
              className="absolute top-0 left-0 w-full h-40 bg-white z-20"
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
              className="absolute top-0 left-0 w-full h-40 bg-gray-50 z-10"
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
                  className="absolute top-14 left-1/2 -translate-x-1/2 z-25"
                >
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <div className="absolute bottom-12 left-0 right-0 flex items-center justify-center z-15">
              <div className="px-6 py-2" style={{
                fontFamily: 'cursive',
                fontSize: '20px',
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
              <div className="relative p-12 rounded bg-white shadow-2xl overflow-hidden" style={{
                border: '2px solid #333',
                borderStyle: 'solid',
              }}>
                {/* 노트 줄 무늬 */}
                <div className="absolute inset-0" style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 29px, #e8e8e8 29px, #e8e8e8 30px)',
                  marginTop: '60px',
                }}></div>

                {/* 왼쪽 빨간 세로선 */}
                <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-red-400" style={{
                  opacity: 0.3,
                }}></div>

                {/* 편지 내용 */}
                <div className="relative z-10">
                  <p className="leading-loose text-gray-800 text-lg" style={{
                    fontFamily: 'GangwonEducationModuche, cursive',
                  }}>
                    <span className="text-2xl font-bold text-gray-900 block mb-5 pb-2">진갈매기 선생님께</span>
                    <br/>
                    올해는 홈페이지 만들어드리면서 이것저것 생각이 많아져서 편지 한 번 써봅니다.<br/>
                    <br/>
                    7년 군생활 하고 제대한후에 개발자 일해보겠다고 이것저것 배워가면서<br/>
                    1~2년동안 공부랑 취업준비한다고 제대 하고도 어디 못갔네예<br/>
                    <br/>
                    아들내미가 어떤일을 하는지 잘 모를꺼같아서 이렇게 한번 실력발휘를 해봤습니다.<br/>
                    <br/>
                    생신 축하드리고 앞으로도 더 열심히 해보겠습니다.<br/>
                    아빠도 항상 건강 챙기시고, 얼마안남은 올해도 좋은 일만 가득하길 바랍니다.<br/>
                    <br/>
                    그리고 사실 이런 말 평소엔 안 하지만, 항상 감사하고 존경합니다.
                  </p>

                  {/* 닫기 버튼 */}
                  <div className="flex justify-end">

                  <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(false);
                    }}
                    className="mt-10 rounded px-8 py-2  bg-white hover:bg-gray-50 text-gray-800 text-lg font-bold transition-all duration-300"
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
