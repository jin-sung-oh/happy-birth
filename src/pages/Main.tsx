import { useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import TabWrapper from "../components/TabWrapper";
import dadphoto from "../assets/images/mam-dad.jpeg";

export default function Main(){

    const tabs = [

        { key: "letter", label: "편지", title: "아빠에게 보내는 편지 💌" },
        { key: "gift", label: "선물", title: "아빠를 위한 특별한 선물 🎁" },
        { key: "photo", label: "촬영", title: "추억의 사진들 📸" },
        { key: "song", label: "노래", title: "아빠를 위한 노래 🎵" },
    ];
    const [searchParams, setSearchParams] = useSearchParams();
    const param = searchParams.get("tab");
    const found = param ? tabs.findIndex(t => t.key === param) : -1;
    const safeIndex = found === -1 ? 0 : found;

    // derive active directly from the URL to avoid sync issues
    const active = safeIndex;

    // 탭에 따른 타이틀
    const getTitle = () => {
        if (!param) return "🎉 진형도의 생일을 축하합니다 ! 🎉";
        return tabs[active]?.title || "🎉 진형도의 생일을 축하합니다 ! 🎉";
    };

    const handleOnClickHome = () => {
        // clear tab param and navigate home
        setSearchParams({}, { replace: true });
    }

    return(
        <main className="bg-blue-100 h-full min-h-screen md:p-4 p-2">
        <section className="pb-10 container mx-auto">

            <h1 className="md:text-3xl text-xl font-semibold text-center md:py-24 py-12 px-4">{getTitle()}</h1>
            <section>
                <div role="tablist" className="grid md:grid-cols-5 grid-cols-3 md:gap-24 gap-4 justify-center text-center md:text-2xl text-base font-medium px-4">
                    <Button
                        onClick={handleOnClickHome}
                        className={
                            "cursor-pointer w-full md:w-fit md:px-12 px-4 py-2 transition-all md:text-xl text-sm font-semibold " +
                            (!param
                                ? "text-blue-400 rounded-md"
                                : "")
                        }
                    >
                        홈
                    </Button>
                    {tabs.map((t, i) => (
                        <Button
                            key={t.key}
                            role="tab"
                            aria-selected={!!(param && active === i)}
                            onClick={() => setSearchParams({ tab: t.key })}
                            className={
                                "cursor-pointer w-full md:w-fit md:px-12 px-4 py-2 transition-all md:text-xl text-sm font-semibold " +
                                (param && active === i
                                    ? " text-blue-400 rounded-md"
                                    : "")
                            }
                        >
                            {t.label}
                        </Button>
                    ))}

                </div>

                {param && <TabWrapper active={active} />}
                {!param && <img src={dadphoto} alt="Dad's Photo" className="mx-auto mt-20 max-w-full md:w-[800px] w-full rounded-lg shadow-lg px-4" />}

            </section>
         </section>
         </main>
     )
 }