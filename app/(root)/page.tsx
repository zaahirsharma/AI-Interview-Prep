import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
    return (
        <>
            <section className={"card-cta"}>
                <div className={"flex flex-col gap-6 max-w-lg"}>
                    <h2>Get Interview Ready With AI-Powered Practice & Feedback</h2>
                    <p className={"text-lg"}>Practice with real interview questions & get instant feedback</p>
                    {/*Button will be property of a child which will be a link*/}
                    <Button asChild className={"btn-primary max-sm:w-full"}>
                        <Link href={"/interview"}>Start an Interview</Link>
                    </Button>
                </div>

                <Image
                    src={"/robot.png"}
                    alt={"robot"}
                    width={"400"}
                    height={"400"}
                    className={"max-sm:hidden"}
                />
            </section>

            <section>

            </section>
        </>
    )
}
export default Page
