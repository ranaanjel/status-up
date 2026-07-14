import Image from "next/image";

export function Banner() {
    return <div className=" ">
        <Image className="w-full h-full object-scale-down" src={"/metric.webp"} width={"1000"} height={"1000"} alt="banner"></Image>
    </div>
}