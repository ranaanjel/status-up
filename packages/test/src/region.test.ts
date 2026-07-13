import { describe, it, test , expect} from "bun:test";

// simply creating the region if not present in test

//seeding the regions table

import prisma from "@packages/db/client";

// checking for the region table;

let region_table = await prisma.regions.findMany({});

if (region_table.length == 0) {
    // creating the table
    let res  = await prisma.regions.createMany({
        data:[{name:"India"}, {name:"USA"}]
    })

    console.log(res)

}else {
    // doing nothing
    console.log(JSON.stringify(region_table))
}