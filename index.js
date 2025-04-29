import express from 'express';

import redis from 'redis';

const getData = async () => {
    const data = await new Promise((resolve) => {
        const d = [
            {
                name: 'John Doe',
                age: 30,
                address: '123 Main St, Springfield, USA'
            },
            {
                name: 'Jane Smith',
                age: 25,
                address: '456 Elm St, Springfield, USA'
            },
            {
                name: 'Bob Johnson',
                age: 40,
                address: '789 Oak St, Springfield, USA'
            },
            {
                name: 'Alice Brown',
                age: 35,
                address: '101 Pine St, Springfield, USA'
            },
            {
                name: 'Charlie Davis',
                age: 28,
                address: '202 Maple St, Springfield, USA'
            },
            {
                name: 'Eve Wilson',
                age: 32,
                address: '303 Birch St, Springfield, USA'
            },
            {
                name: 'Frank Miller',
                age: 45,
                address: '404 Cedar St, Springfield, USA'
            },
            {
                name: 'Grace Lee',
                age: 29,
                address: '505 Spruce St, Springfield, USA'
            },
            {
                name: 'Hank Taylor',
                age: 38,
                address: '606 Fir St, Springfield, USA'
            },
            {
                name: 'Ivy Anderson',
                age: 27,
                address: '707 Walnut St, Springfield, USA'
            },
            {
                name: 'Jack Thomas',
                age: 33,
                address: '808 Chestnut St, Springfield, USA'
            },
            {
                name: 'Kathy Jackson',
                age: 31,
                address: '909 Poplar St, Springfield, USA'
            },
            {
                name: 'Leo White',
                age: 36,
                address: '1010 Willow St, Springfield, USA'
            },
            {
                name: 'Mia Harris',
                age: 26,
                address: '1111 Ash St, Springfield, USA'
            },
            {
                name: 'Nina Martin',
                age: 34,
                address: '1212 Sycamore St, Springfield, USA'
            },
            {
                name: 'Oscar Thompson',
                age: 39,
                address: '1313 Hickory St, Springfield, USA'
            }
        ];
        setTimeout(() => {
            resolve(d);
            // random between 5 and 15 seconds
        }, Math.floor(Math.random() * 10000) + 5000);
    });
    return data;
}

const redisClient = redis.createClient({
    url: 'redis://redis:6379',
});

const bootstrap = async () => {

    const app = express();

    app.get('/huge', async(req, res) => {

        const cache = req.query.cache ? req.query.cache.toLowerCase() === "true" : true
        if (!redisClient || !cache) {
            const data = await getData();
            return res.status(200).json(data);
        }

        if (await redisClient.exists('huge')) {
            const data = await redisClient.get('huge');
            return res.status(200).json(JSON.parse(data));
        }

        const data = await getData();
        await redisClient.set('huge', JSON.stringify(data));
        await redisClient.expire('huge', 10);

        return res.status(200).json(data);
    });

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}

const start = async () => {
    redisClient.connect().then(() => {
        bootstrap(redisClient);
    })
}

start().catch((err) => {
    console.error('Error starting the server:', err);
});
