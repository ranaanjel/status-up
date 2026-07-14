"use server"

import { getWebsiteInformation } from "@/app/actions";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home({params}:{params:Promise<{websiteId:string}>}) {

    let id = (await params).websiteId;

    // server action to fetch the data and getting it right;
    let data = await getWebsiteInformation(id);

    if(data == "") {
        redirect("/error")
    }
    let status = [];

    console.log(data, "----- ")

    return <div className="px-100 py-10 ">
          <Link className={""} href={"/dashboard"}><ArrowLeftIcon className="mb-5"></ArrowLeftIcon></Link>
        <div className="flex justify-between w-full  ">

            <div>
                <div className="text-2xl font-bold">
                    URL 
                 
                </div>
                <div>
                   { data.url}
                </div>
            </div>
            <div>
                <div className="font-bold flex gap-2 items-center">
                    Current  Status
                <div className="text-xs font-light">
                    : {data.ticks[0] && data.ticks[0].status}
                    
                </div>
                </div>
                <div className="font-bold flex gap-2 items-center">
                    Last Checked 
                <div className="text-xs font-light">
                    
                    : {data.ticks[0] && data.ticks[0].time_added}
                </div>
                </div>

                <div className="font-bold flex gap-2 items-center">
                    Response  Time
                <div className="text-xs font-light">
                    
                    : {data.ticks[0] && data.ticks[0].reponse_time_ms} ms
                </div>
                </div>
                <div className="font-bold flex gap-2 items-center">
                    Region Id
                <div className="text-xs font-light">
                    : {data.ticks[0] && data.ticks[0].regionId} 
                </div>
                </div>
            </div>
        </div>
        <div>
            <Table>
                <TableCaption>A list of your last 19 status.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead>Response Time</TableHead>
                        <TableHead>Checked At</TableHead>
                        <TableHead className="text-right">Region Id</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.ticks.length > 0 && data.ticks.map((tickValue: { id:string, reponse_time_ms:number, status:string, time_added:string, regionId:string}) => {
                    
                        return (
                        <TableRow key={tickValue.id}>
                            <TableCell>{tickValue.status}</TableCell>
                            <TableCell className="font-medium">{tickValue.reponse_time_ms}</TableCell>
                            <TableCell>{tickValue.time_added} ms</TableCell>
                            <TableCell className="text-right">{ tickValue.regionId}</TableCell>
                            
                        </TableRow>
                    )})}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total Websites</TableCell>
                        <TableCell className="text-right">{data.ticks.length - 1}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    </div>
}