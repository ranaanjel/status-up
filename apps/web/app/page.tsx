import { Banner } from "@/components/bannerImage";
import { NavBar } from "@/components/navBar";


export default function Home() {
  return (
    <div className="bg-amber-50 h-auto min-h-screen px-56 py-10 dark:bg-black" >   
      {/* // nav bar  */}
    <NavBar></NavBar>
    {/* //banner images  */}

    <Banner></Banner>
    {/* //footer values */}

    <div className="bg-gray-500/40 w-full h-px "></div>
    <div className="flex justify-between m-4 my-2 h-32 items-center ">
    <div>
      status up &copy; 2026
    </div>
    <div>
      building a websites status tracking site.
    </div>
    </div>
    </div>
  );
}
