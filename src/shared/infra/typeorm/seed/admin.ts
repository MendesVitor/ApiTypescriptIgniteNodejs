import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../index";

async function create() {
    const connection = await createConnection("localhost");

    const id = uuidv4();
    const password = await hash("admin", 8);

    await connection.query(
        `
            INSERT INTO USERS(id,username,name,email,driver_license,password,"isAdmin",created_at)
            VALUES('${id}','admin','admin','admin@rentx.com.br','1234','${password}',true,'now()')
        `
    );

    await connection.close;
}

create().then(() => {
    console.log("User Admin Created");
});
