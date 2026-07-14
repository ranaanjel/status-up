"use client"
import { addWebsite, fetchWebsite, signOut } from "@/app/actions"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ArrowUpRight, Link, LogOut, PlusIcon, RefreshCwIcon } from "lucide-react"
import Image from "next/image"
import { redirect } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AddWebsiteDialog() {

    let urlRef = useRef<HTMLInputElement>(null)
    let [open , setOpen] = useState(false)

  return (
    <Dialog open={open}>
      <form >
        <DialogTrigger onClick={() => {
            setOpen(true)}} render={<Button className="flex items-center gap-2 p-2"><PlusIcon className="size-4 "></PlusIcon> Website</Button>} />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add website </DialogTitle>
            <DialogDescription>
              recheck before adding the url
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="url">URL</Label>
              <Input ref={urlRef} id="url" name="url" placeholder="https://website.com" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose onClick={() => {
            setOpen(false)}} render={<Button variant="outline">Exit</Button>} />
            <Button onClick={() => {
                // getting the url 
                let url = urlRef.current?.value;
                if(url) {
                        addWebsite(url)
                }
            }} type="submit">Add Website</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}


export function DashbordBar() {
    return <div className="flex justify-between">

        <div className="flex gap-4">
            <Image src="/wifi.jpg" width={30} className="rounded-sm" height={30} alt={"logo"} />
            <div className="text-2xl font-stretch-ultra-condensed font-bold ">status up</div>

        </div>
        <div className="cursor-pointer" onClick={async () => {
            await signOut();
            redirect("/")
        }}>
            <LogOut></LogOut>
        </div>
    </div>
}


export function DashBoardTable() {

    let [webList, setWebList] = useState([]);

    useEffect(() => {
        fetchWebsite().then(res => {
            
            setWebList(res.websiteList);
        }).catch(() => {
            console.log("some error occured")
        });

    }, [])

    return (
        <div className="my-10">
            <div className="flex justify-end gap-2 items-center">
                <div onClick={() => {
                    navigation.reload();
                }} className="flex items-center gap-1 border p-2 rounded-sm cursor-pointer">
                    <RefreshCwIcon className="size-4"></RefreshCwIcon>
                    Refresh
                </div>
                <div className="">
                  <AddWebsiteDialog></AddWebsiteDialog>
                </div>
            </div>
            <Table>
                <TableCaption>A list of your websites.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">URL</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Response Time</TableHead>
                        <TableHead>Last Checked</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {webList.length > 0 && webList.map((webValue: { url: string, ticks:{reponse_time_ms:number, status:string, time_added:string}[], id: string }) => {
                    
                        return (
                        <TableRow key={webValue.id}>
                            <TableCell>{webValue.url}</TableCell>
                            <TableCell className="font-medium">{webValue.ticks[0] &&webValue.ticks[0].status}</TableCell>
                            <TableCell>{webValue.ticks[0]&& webValue.ticks[0].reponse_time_ms} ms</TableCell>
                            <TableCell>{ webValue.ticks[0] && webValue.ticks[0].time_added}</TableCell>
                            <TableCell onClick={() => {
                                redirect("/website/"+webValue.id)
                            }} className="hover:animate-pulse cursor-pointer flex justify-end"><ArrowUpRight></ArrowUpRight></TableCell>
                        </TableRow>
                    )})}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4}>Total Websites</TableCell>
                        <TableCell className="text-right">{webList.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

