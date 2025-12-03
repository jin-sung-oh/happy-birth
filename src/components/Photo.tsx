import { useEffect, useRef, useState } from "react";

export default function Photo(){
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        const initCamera = async () => {
            try {
                //카메라 접근 권한 요청
                const stream = await navigator.mediaDevices.getUserMedia({video: true});
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("카메라 접근 실패:", error);
            }
        };

        if (!photoUrl) {
            initCamera();
        }

        // 컴포넌트 언마운트 시 카메라 정리
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, [photoUrl]);

    //사진 촬영
    const takePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas) return;

        // canvas 크기를 video 크기에 맞춤
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // video를 canvas에 그리기
        const context = canvas.getContext("2d");
        if (context) {
            context.drawImage(video, 0, 0);
        }

        // canvas를 이미지 URL로 변환
        const imageUrl = canvas.toDataURL("image/jpeg");
        setPhotoUrl(imageUrl);
    };

    //카카오톡 공유
    const sharePhoto = async () => {
        if (!photoUrl) return;

        try {
            // dataURL을 blob으로 변환
            const response = await fetch(photoUrl);
            const blob = await response.blob();
            const file = new File([blob], "birthday-photo.jpg", { type: "image/jpeg" });

            // Web Share API로 공유
            if (navigator.share) {
                await navigator.share({
                    files: [file],
                    title: "생일 축하 사진",
                    text: "생일 축하해요!"
                });
            } else {
                alert("공유 기능을 지원하지 않는 브라우저입니다.");
            }
        } catch (error) {
            console.error("공유 실패:", error);
        }
    };

    return(
        <section className="flex flex-col items-center justify-center min-h-[60vh] gap-6 p-4">
            {/* 카메라 화면 */}
            {!photoUrl && (
                <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full rounded-lg shadow-2xl border-4 border-white"
                    ></video>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl px-8 py-4 rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95"
                        onClick={takePhoto}
                    >
                        📸 촬영하기
                    </button>
                </div>
            )}

            {/* 숨겨진 canvas (사진 캡처용) */}
            <canvas ref={canvasRef} style={{display: "none"}}></canvas>

            {/* 찍은 사진 미리보기 */}
            {photoUrl && (
                <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
                    <img
                        src={photoUrl}
                        alt="찍은 사진"
                        className="w-full rounded-lg shadow-2xl border-4 border-white"
                    />
                    <div className="flex gap-4 flex-wrap justify-center">
                        <button
                            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-xl px-8 py-4 rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95"
                            onClick={sharePhoto}
                        >
                            💬 카카오톡 공유
                        </button>
                        <button
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold text-xl px-8 py-4 rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95"
                            onClick={() => setPhotoUrl(null)}
                        >
                            🔄 다시 찍기
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}
