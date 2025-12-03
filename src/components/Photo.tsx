import { RefreshCcw } from "lucide-react";
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

    //사진 촬영 - 폴라로이드 프레임 포함
    const takePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas) return;

        // 폴라로이드 비율 설정 (정사각형 사진 + 하단 여백)
        const photoSize = 1000; // 사진 크기
        const padding = 40; // 좌우상 패딩
        const bottomPadding = 160; // 하단 패딩 (텍스트 공간)

        canvas.width = photoSize + (padding * 2);
        canvas.height = photoSize + padding + bottomPadding;

        const context = canvas.getContext("2d");
        if (context) {
            // 흰색 배경 (폴라로이드 프레임)
            context.fillStyle = "#ffffff";
            context.fillRect(0, 0, canvas.width, canvas.height);

            // 비디오의 중앙 부분을 정사각형으로 자르기
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;
            const minDimension = Math.min(videoWidth, videoHeight);

            // 중앙에서 정사각형으로 자르기 위한 좌표 계산
            const sx = (videoWidth - minDimension) / 2;
            const sy = (videoHeight - minDimension) / 2;

            // 비디오를 정사각형으로 그리기 (중앙 부분만)
            context.drawImage(
                video,
                sx, sy, minDimension, minDimension, // 소스 영역 (중앙 정사각형)
                padding, padding, photoSize, photoSize // 대상 영역
            );

            // 오늘 날짜 가져오기
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const dateText = `${year}.${month}.${day} 아빠 생신 🎉`;

            // 하단 텍스트 추가
            context.fillStyle = "#6B7280";
            context.font = "48px 'GangwonEducationModuche', cursive";
            context.textAlign = "center";
            context.fillText(dateText, canvas.width / 2, photoSize + padding + 100);
        }

        // canvas를 이미지 URL로 변환
        const imageUrl = canvas.toDataURL("image/jpeg", 0.95);
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
            {/* 카메라 화면 - 폴라로이드 스타일 */}
            {!photoUrl && (
                <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
                    {/* 폴라로이드 프레임 */}
                    <div className="bg-white p-4 pb-16 shadow-2xl relative" style={{
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.15)',
                    }}>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="w-full aspect-square object-cover"
                        ></video>
                        {/* 폴라로이드 하단 여백에 텍스트 */}
                        <div className="absolute bottom-4 left-0 right-0 text-center">
                            <p className="text-gray-600 font-handwriting text-lg">
                                {new Date().getFullYear()}.{String(new Date().getMonth() + 1).padStart(2, '0')}.{String(new Date().getDate()).padStart(2, '0')} 아빠 생신 🎉
                            </p>
                        </div>
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl px-8 py-4 rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95"
                        onClick={takePhoto}
                    >
                        촬영하기 📸 
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
                        className="w-full max-w-xl shadow-2xl"
                    />
                    <div className="flex gap-4 flex-wrap justify-center">
                        <button
                            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-xl px-8 py-4 rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95"
                            onClick={sharePhoto}
                        >
                            💬 카카오톡 공유
                        </button>
                        <button
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold text-xl px-8 py-4 rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                            onClick={() => setPhotoUrl(null)}
                        >
                            <RefreshCcw size={20} /> 다시 찍기
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}
