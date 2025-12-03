export default function Song(){
    return(
        <section className="flex flex-col items-center justify-center gap-8 p-4 min-h-[60vh]">
            {/* 위쪽 영상 - 자동 재생 */}
            <div className="w-full max-w-4xl">
                <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">🎵 진해갈매기 진형도의 노래</h2>
                <div className="relative w-full rounded-lg overflow-hidden shadow-2xl" style={{paddingBottom: '56.25%'}}>
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/cWp2kWgRPNQ?autoplay=1&mute=1"
                        title="자동 재생 영상"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            {/* 아래쪽 영상 - 대기 상태 */}
            <div className="w-full max-w-4xl">
                <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">🎤 더 많은 노래</h2>
                <div className="relative w-full rounded-lg overflow-hidden shadow-2xl" style={{paddingBottom: '56.25%'}}>
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/DheZcrVBe0o"
                        title="대기 상태 영상"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </section>
    )
}