import { useEffect, useRef } from "react";
import NotificationData from "@/components/ui/NotificationData";

const notifications = [
    {
        img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        name: "bell bunlung",
        detail: "create post",
        createdAt: "1 minute"
    },
    {
        img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        name: "bell bunlung",
        detail: "create post",
        createdAt: "1 minute"
    },
    {
        img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        name: "bell bunlung",
        detail: "create post",
        createdAt: "1 minute"
    },
    {
        img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        name: "bell bunlung",
        detail: "create post",
        createdAt: "1 minute"
    },
];

interface NotificationPopupProp {
    setOpenNotification: (value: React.SetStateAction<boolean>) => void;
}

export default function NotificationPopup({ setOpenNotification }: NotificationPopupProp) {
    const notificationPopupContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const targetClickHandler = (e: MouseEvent) => {
            if (notificationPopupContainerRef.current && !notificationPopupContainerRef.current?.contains(e.target as Node)) {
                setOpenNotification(false);
            }
        }
        document.addEventListener("mousedown", targetClickHandler);

        return () => {
            document.removeEventListener("mousedown", targetClickHandler);
        }
    }, []);

    return (
        <div ref={notificationPopupContainerRef} className="absolute top-[120%] right-0 w-[350px] h-[400px] flex flex-col p-4 shadow-[0_4px_16px_rgba(17,17,26,.05),_0_8px_32px_rgba(17,17,26,.05)] rounded-[10px]">
            <h1 className="text-center text-xl text-[#353535] font-bold">Notifications</h1>
            <div className="border border-solid border-gray-100 mt-4 w-[90%]"></div>
            <div className="w-full h-full overflow-y-scroll cursor-pointer">
                {notifications.map((noti, index) => (
                    <NotificationData key={index} img={noti.img} name={noti.name} detail={noti.detail} createdAt={noti.createdAt} />
                ))}
            </div>
        </div>
    );
}