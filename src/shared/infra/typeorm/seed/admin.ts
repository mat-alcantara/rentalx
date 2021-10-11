import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuidv4();
  const password = await hash('admin', 8);

  await connection.query(
    `INSERT INTO users(id, name, email, password, "isAdmin", driver_license) 
    values('${id}', 'Admin', 'admin@admin.com', '${password}', true, 'CFE-1221')`,
  );
}

create().then(() => console.log('User admin created'));
