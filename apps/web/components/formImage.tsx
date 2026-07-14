import Image from "next/image";

export function ImageForm() {
    return <div className="w-5/10 h-screen ">
        <Image src={"/auth.jpg"} className="w-full h-full object-cover " width={"1000"} height={"1000"} alt="form-image"></Image>
    </div>
}