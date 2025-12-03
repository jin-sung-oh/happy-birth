import Letter from "./Letter";
import Photo from "./Photo";
import Song from "./Song";
import Gift from "./ui/Gift";

export default function TabWrapper({ active }: { active: number }) {
    return (
        <div className="mt-8 max-w-5xl mx-auto">
            <div className="">
                {active === 0 && <Letter />}
                {active === 1 && <Gift />}
                {active === 2 && <Photo />}
                {active === 3 && <Song />}
            </div>
        </div>
    );
}