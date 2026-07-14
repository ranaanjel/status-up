import { FormFill } from "@/components/formFill"
import { ImageForm } from "@/components/formImage"

export default function Page() {
    return <div className="w-screen h-screen flex">
        <ImageForm></ImageForm>
        <div className="py-25 px-40  w-full border-l border-white">
            <FormFill type="signin"></FormFill>
        </div>
    </div>
}