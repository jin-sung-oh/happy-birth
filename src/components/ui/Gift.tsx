import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import shimg from "../../assets/images/sh-img.jpeg";
import shletter from "../../assets/images/sh-letter.jpeg";

export default function Gift() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentGiftName, setCurrentGiftName] = useState<string>("");

  const handleImageClick = (giftName: string) => {
    setCurrentGiftName(giftName);
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    setSelectedImage(shletter);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
    setCurrentGiftName("");
  };

  return (
    <section className="px-4">
      <article className="grid md:grid-cols-2 grid-cols-1 md:gap-20 gap-10 p-6 mt-16 max-w-4xl mx-auto">
        <img
          src={shimg}
          alt="Gift 1"
          className="w-full border-3 border-dashed border-blue-700 p-1 aspect-square object-cover cursor-pointer rounded-full shadow-md hover:opacity-90 transition-opacity"
          onClick={() => handleImageClick("허승훈")}
        />
        <img
          src={shimg}
          alt="Gift 2"
          className="w-full border-3 border-dashed border-blue-700 p-1 aspect-square object-cover cursor-pointer rounded-full shadow-md hover:opacity-90 transition-opacity"
          onClick={() => handleImageClick("김채희")}
        />

      </article>

      {/* 확인 모달 - 편지 봉투 스타일 */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white md:p-12 p-8 shadow-2xl max-w-md w-full relative rounded-lg"
              style={{
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 빈티지 장식 - 상단 */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className="w-16 h-0.5 bg-gray-300"></div>
                <div className="text-xl">✉️</div>
                <div className="w-16 h-0.5 bg-gray-300"></div>
              </div>

              {/* 제목 */}
              <h2 className="relative mt-8 md:text-2xl text-lg font-bold text-center md:mb-8 mb-6 text-gray-800 md:leading-relaxed leading-relaxed" style={{
                fontFamily: 'GangwonEducationModuche, cursive',
              }}>
                <span className="text-gray-700">
                  {currentGiftName}
                </span>
                의 선물을<br />
                받으시겠습니까?
              </h2>

              {/* 빈티지 장식 - 하단 */}
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                  <div className="text-xs">♥</div>
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                </div>
              </div>

              {/* 버튼 */}
              <div className="relative flex gap-4 justify-center">
                <button
                  onClick={handleConfirm}
                  className="bg-white hover:bg-gray-50 text-gray-800 font-bold md:text-lg text-base md:px-8 px-6 md:py-3 py-2 transition-all hover:scale-105 active:scale-95"
                  style={{
                    border: '2px solid #333',
                    boxShadow: '2px 2px 0px #333',
                  }}
                >
                  네
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-white hover:bg-gray-50 text-gray-800 font-bold md:text-lg text-base md:px-8 px-6 md:py-3 py-2 transition-all hover:scale-105 active:scale-95"
                  style={{
                    border: '2px solid #333',
                    boxShadow: '2px 2px 0px #333',
                  }}
                >
                  아니요
                </button>
              </div>

              {/* 종이 질감 */}
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
              }}></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 이미지 모달 */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={selectedImage}
              alt="확대 이미지"
              className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl cursor-pointer"
              onClick={() => setSelectedImage(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}