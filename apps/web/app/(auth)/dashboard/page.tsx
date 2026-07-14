import { DashBoardTable, DashbordBar } from "@/components/dashboardCom";

export default function Page() {
    return <div className="px-100 py-4">
        <DashbordBar></DashbordBar>
        <DashBoardTable></DashBoardTable>
    </div>
}