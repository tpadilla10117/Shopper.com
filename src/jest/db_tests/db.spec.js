/* This is where I test my db adapters with jest: */
    
import { client } from "../../backend/index";
import { getAllUsers } from "../../backend/dbadapters/users";

import { dropTables, createTables } from '../../backend/seed';

    describe('Database', () => {

        beforeAll( async () => {
            client.connect();
            await dropTables();
            await createTables();
            /* await seedInitialUsers(); */
        });

    /* After the tests run, clean up... */
        afterAll( async() => {
            client.end();
        });

        describe('users', () => {
            let testUser;
        
            describe('getAllUsers', () => {
                beforeAll(async() => {
                    testUser = await getAllUsers( 
                        /* [ 
                            {
                            id: 1,
                            username: 'Henryfluff',
                            name: 'Henry',
                            location: 'Asgard',
                            active: true,
                            }
                        ] */
                    );
                })
    
                it('Returns an object', async () => {
                    expect(typeof testUser).toBe('object');
                });
    
            });

        });

        
    });