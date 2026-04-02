"use client";

import { formatViews } from "@/utils/formatVideoView";
import { useEffect, useRef, useState } from "react";
import { useTrackVideoViewMutation } from "@/services/mutations/videoMutation";

const VideoView = ({
                       viewCount,
                       videoId,
                       videoDuration
                   }: {
    viewCount: number;
    videoId: string;
    videoDuration: number;
}) => {
    const { mutate } = useTrackVideoViewMutation();

    const hasCalled = useRef(false);

    useEffect(() => {
        if (!videoId || hasCalled.current) return;

        let triggerTime = 0;

        if (videoDuration < 60) {
            triggerTime = videoDuration * 0.15;
        } else {
            triggerTime = 20;
        }

        const timer = setTimeout(() => {
            if (hasCalled.current) return;
            hasCalled.current = true;
            mutate(videoId);
        }, triggerTime * 1000);

        return () => clearTimeout(timer);

    }, [videoId, videoDuration]);

    return (
        <div>
            {formatViews(viewCount)} views
        </div>
    );
};

export default VideoView;
