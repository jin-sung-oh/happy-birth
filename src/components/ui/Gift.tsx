import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import shimg from "../../assets/images/sh-img.jpeg";
import shletter from "../../assets/images/sh-letter.jpeg";

export default function Gift() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="px-4">
      <article className="grid md:grid-cols-2 grid-cols-1 md:gap-20 gap-10 p-6 mt-16 max-w-4xl mx-auto">
        <img
          src={shimg}
          alt="Gift 1"
          className="w-full border-3 border-dashed border-blue-700 p-1 aspect-square object-cover cursor-pointer rounded-full shadow-md hover:opacity-90 transition-opacity"
          onClick={() => setSelectedImage(shletter)}
        />
        <img
          src={shimg}
          alt="Gift 2"
          className="w-full border-3 border-dashed border-blue-700 p-1 aspect-square object-cover cursor-pointer rounded-full shadow-md hover:opacity-90 transition-opacity"
          onClick={() => setSelectedImage(shletter)}
        />

      </article>

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