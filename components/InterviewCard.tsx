import React from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import {getRandomInterviewCover} from "@/lib/utils";

const InterviewCard = ({interviewId, userId, role, type, techstack, createdAt } : InterviewCardProps) => {
    // Feedback for each card
    const feedback = null as Feedback | null;
    // Normalize the type of interview
    const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;
    // Format date using dayjs, either using feedback time, creation time, or current time if neither available
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY');


    return (
        <div className={"card-border w-[360] max-sm:w-full min-h-96"}>
            <div className={"card-interview"}>
                <div>
                    <div className={"absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600"}>
                        <p className={"badge-text"}>{normalizedType}</p>
                    </div>

                    <Image src={getRandomInterviewCover()} alt={"cover-image"} width={90} height={90} className="rounded-full object-fit size-[90px]" />
                </div>
            </div>
        </div>
    )
}
export default InterviewCard
