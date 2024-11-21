// // const sql = require('mssql');
// // const express = require('express');
// // const app = express();
// // app.use(express.json());

// // const config = {
// //     user: 'sa',
// //     password: 'ca123',
// //     server: 'ARUNKR-LT\\SQLEXPRESS', 
// //     database: 'ASRS_TATA_API',
// //     options: {
// //         encrypt: true, // if using Azure, set to true
// //         trustServerCertificate: true
// //     }
// // };

// // app.post('/students', async (req, res) => {

// //     const reqtype=req.body.body;
// //     const validationErrors = [];
// //     var flag=0
// //     console.log(reqtype);
// //     const { data } = req.body.body;

// //     // if(reqtype.body.type==="TPFGRetrieveRequest")
// //     if (reqtype.body && reqtype.body.type && reqtype.body.type.trim() === "TPFGRetrieveRequest") 
// //     {

// //         //console.log("The request type is TPFGRetrieveRequest");
// //         data.forEach((item, index) => {
     
    
// //             if (!("TokenNo" in item)) {
// //                 validationErrors.push(`body.data[${index}].TokenNo: The TokenNo field is missing.`);
// //             } else if (item.TokenNo === null || item.TokenNo === '') {
// //                 validationErrors.push(`body.data[${index}].TokenNo: The TokenNo field should not be null or empty.`);
// //             }
    
// //             if (!("ItemCode" in item)) {
// //                 validationErrors.push(`body.data[${index}].ItemCode: The ItemCode field is missing.`);
// //             } else if (item.ItemCode === null || item.ItemCode === '') {
// //                 validationErrors.push(`body.data[${index}].ItemCode: The ItemCode field should not be null or empty.`);
// //             }
    
// //             if (!("SalesOrder" in item)) {
// //                 validationErrors.push(`body.data[${index}].SalesOrder: The SalesOrder field is missing.`);
// //             } else if (item.SalesOrder === null || item.SalesOrder === '') {
// //                 validationErrors.push(`body.data[${index}].SalesOrder: The SalesOrder field should not be null or empty.`);
// //             }
    
// //             if (!("STOOrder" in item)) {
// //                 validationErrors.push(`body.data[${index}].STOOrder: The STOOrder field is missing.`);
// //             } else if (item.STOOrder === null || item.STOOrder === '') {
// //                 validationErrors.push(`body.data[${index}].STOOrder: The STOOrder field should not be null or empty.`);
// //             }
    
// //             if (!("ReturnableGateNo" in item)) {
// //                 validationErrors.push(`body.data[${index}].ReturnableGateNo: The ReturnableGateNo field is missing.`);
// //             } else if (item.ReturnableGateNo === null || item.ReturnableGateNo === '') {
// //                 validationErrors.push(`body.data[${index}].ReturnableGateNo: The ReturnableGateNo field should not be null or empty.`);
// //             }
    
// //             if (!("BatchNo" in item)) {
// //                 validationErrors.push(`body.data[${index}].BatchNo: The BatchNo field is missing.`);
// //             } else if (item.BatchNo === null || item.BatchNo === '') {
// //                 validationErrors.push(`body.data[${index}].BatchNo: The BatchNo field should not be null or empty.`);
// //             }
    
// //             if (!("Quantity" in item)) {
// //                 validationErrors.push(`body.data[${index}].Quantity: The Quantity field is missing.`);
// //             } else if (item.Quantity === null || item.Quantity === '') {
// //                 validationErrors.push(`body.data[${index}].Quantity: The Quantity field should not be null or empty.`);
// //             }
            
// //         });

// //     }
// //     else
// //     {
// //         flag=1;
// //         validationErrors.push("The request type is not TPFGRetrieveRequest");
// //         console.log("The request type is not TPFGRetrieveRequest");
// //     }

    

// //     // Validation for missing or empty Quantity and UOM fields

   

// //     // If validation errors exist, return a 400 response with detailed error message
// //     if (validationErrors.length > 0 )
// //     {
// //         if( flag==0)
// //         {
// //         return res.status(400).json({
// //             title: "One or more validation errors occurred.",
// //             status: 400,
// //             errors: {
// //                 validation: validationErrors
// //             }
// //         });
// //         }
// //         else
// //         {
// //             return res.status(400).send(validationErrors)
// //         }
// //     }

// //     // Extract Quantity and UOM for database insertion
// //     const extractedData = data.map(item => ({
// //         TokenNo: item.TokenNo,
// //         ItemCode: item.ItemCode,
// //         SalesOrder: item.SalesOrder,
// //         STOOrder: item.STOOrder,
// //         ReturnableGateNo: item.ReturnableGateNo,
// //         BatchNo: item.BatchNo,
// //         Quantity: item.Quantity
        
// //     }));

// //     try {
// //         let pool = await sql.connect(config);
        
// //         // Create TVP (Table-Valued Parameter)
// //         const tvp = new sql.Table('UDT_FG_Req');
// //         tvp.columns.add('TokenNo', sql.NVarChar(50));
// //         tvp.columns.add('ItemCode', sql.NVarChar(50));
// //         tvp.columns.add('SalesOrder', sql.NVarChar(50));
// //         tvp.columns.add('STOOrder', sql.NVarChar(50));
// //         tvp.columns.add('ReturnableGateNo', sql.NVarChar(50));
// //         tvp.columns.add('BatchNo', sql.NVarChar(50));
// //         tvp.columns.add('Quantity', sql.NVarChar(50));


// //         // Add rows to the TVP
// //         extractedData.forEach(item => {
// //             tvp.rows.add(item.TokenNo, item.ItemCode,item.SalesOrder, item.STOOrder,item.ReturnableGateNo, item.BatchNo,item.Quantity);
// //         });

// //         // Execute the stored procedure with TVP
// //         const result = await pool.request()
// //             .input('UDT_FG_Req', tvp) // Pass TVP as input to the stored procedure
// //             .execute('sp_ERP_FG_Retrieve_Request');  // Call the stored procedure

// //         // Send success response
// //         console.log(result);
        
// //         res.status(200).json({ success: true, message: 'Data inserted successfully' });
// //     } 
// //     catch (err) {
// //         console.error('SQL error:', err);
// //         res.status(500).json({ success: false, message: 'Failed to insert data' });
// //     } 
// //     finally {
// //         sql.close(); // Ensure the connection is closed
// //     }
// // });

// // // Start the server
// // const port = 3000;
// // app.listen(port, () => {
// //     console.log(`Server running on port ${port}`);
// // });


// ///////////////////////////////////////////////////////////////////////////////////////////



// const sql = require('mssql');
// const express = require('express');
// const app = express();
// app.use(express.json());

// const config = {
//     user: 'sa',
//     password: 'ca123',
//     server: 'ARUNKR-LT\\SQLEXPRESS', 
//     database: 'ASRS_TATA_API',
//     options: {
//         encrypt: true, 
//         trustServerCertificate: true
//     }
// };

// app.post('/students', async (req, res) => {

//     const reqtype=req.body;
//     const validationErrors = [];
//     var flag=0

//     const { data } = req.body.body;
//     if(reqtype.body && reqtype.body.type==="TPFGRetrieveRequest")
//     {

//         //console.log("The request type is TPFGRetrieveRequest");
//         data.forEach((item, index) => {
     
    
//             if (!("TokenNo" in item)) {
//                 validationErrors.push(`body.data[${index}].TokenNo: The TokenNo field is missing.`);
//             } else if (item.TokenNo === null || item.TokenNo === '') {
//                 validationErrors.push(`body.data[${index}].TokenNo: The TokenNo field should not be null or empty.`);
//             }
    
//             if (!("ItemCode" in item)) {
//                 validationErrors.push(`body.data[${index}].ItemCode: The ItemCode field is missing.`);
//             } else if (item.ItemCode === null || item.ItemCode === '') {
//                 validationErrors.push(`body.data[${index}].ItemCode: The ItemCode field should not be null or empty.`);
//             }
    
//             if (!("SalesOrder" in item)) {
//                 validationErrors.push(`body.data[${index}].SalesOrder: The SalesOrder field is missing.`);
//             } else if (item.SalesOrder === null || item.SalesOrder === '') {
//                 validationErrors.push(`body.data[${index}].SalesOrder: The SalesOrder field should not be null or empty.`);
//             }
    
//             if (!("STOOrder" in item)) {
//                 validationErrors.push(`body.data[${index}].STOOrder: The STOOrder field is missing.`);
//             } else if (item.STOOrder === null || item.STOOrder === '') {
//                 validationErrors.push(`body.data[${index}].STOOrder: The STOOrder field should not be null or empty.`);
//             }
    
//             if (!("ReturnableGateNo" in item)) {
//                 validationErrors.push(`body.data[${index}].ReturnableGateNo: The ReturnableGateNo field is missing.`);
//             } else if (item.ReturnableGateNo === null || item.ReturnableGateNo === '') {
//                 validationErrors.push(`body.data[${index}].ReturnableGateNo: The ReturnableGateNo field should not be null or empty.`);
//             }
    
//             if (!("BatchNo" in item)) {
//                 validationErrors.push(`body.data[${index}].BatchNo: The BatchNo field is missing.`);
//             } else if (item.BatchNo === null || item.BatchNo === '') {
//                 validationErrors.push(`body.data[${index}].BatchNo: The BatchNo field should not be null or empty.`);
//             }
    
//             if (!("Quantity" in item)) {
//                 validationErrors.push(`body.data[${index}].Quantity: The Quantity field is missing.`);
//             } else if (item.Quantity === null || item.Quantity === '') {
//                 validationErrors.push(`body.data[${index}].Quantity: The Quantity field should not be null or empty.`);
//             }
            
//         });

//     }
//     else
//     {
//         flag=1;
//         validationErrors.push("The request type is not TPFGRetrieveRequest");
//         console.log("The request type is not TPFGRetrieveRequest");
//     }



   

//     if (validationErrors.length > 0 )
//     {
//         if( flag==0)
//         {
//         return res.status(400).json({
//             title: "One or more validation errors occurred.",
//             status: 400,
//             errors: {
//                 validation: validationErrors
//             }
//         });
//         }
//         else
//         {
//             return res.status(400).send(validationErrors)
//         }
//     }

//     const extractedData = data.map(item => ({
//         TokenNo: item.TokenNo,
//         ItemCode: item.ItemCode,
//         SalesOrder: item.SalesOrder,
//         STOOrder: item.STOOrder,
//         ReturnableGateNo: item.ReturnableGateNo,
//         BatchNo: item.BatchNo,
//         Quantity: item.Quantity
        
//     }));

//     try {
//         let pool = await sql.connect(config);
        
//         const tvp = new sql.Table('UDT_FG_Req');
//         tvp.columns.add('TokenNo', sql.NVarChar(50));
//         tvp.columns.add('ItemCode', sql.NVarChar(50));
//         tvp.columns.add('SalesOrder', sql.NVarChar(50));
//         tvp.columns.add('STOOrder', sql.NVarChar(50));
//         tvp.columns.add('ReturnableGateNo', sql.NVarChar(50));
//         tvp.columns.add('BatchNo', sql.NVarChar(50));
//         tvp.columns.add('Quantity', sql.NVarChar(50));


//         extractedData.forEach(item => {
//             tvp.rows.add(item.TokenNo, item.ItemCode,item.SalesOrder, item.STOOrder,item.ReturnableGateNo, item.BatchNo,item.Quantity);
//         });

//         const result = await pool.request()
//             .input('UDT_FG_Req', tvp)
//             .execute('sp_ERP_FG_Retrieve_Request');  

//         console.log(result);
        
//        // res.status(200).json({ success: true, message: 'Data inserted successfully' });
//        if (result.recordset === undefined || result.recordset.length === 0) 
//         {
//           console.log("Insert successfully.");
//           res.status(200).json({ success: true, message: 'Data inserted successfully' });
//         } 
//         else 
//         {
//             const duplicateTokenNos = result.recordset.map(row => row.TokenNo);
        
//             if (duplicateTokenNos.length > 0) {
//                 const tokenNoMessage = `TokenNo ${duplicateTokenNos.join(', ')} is duplicate.`;
//                 console.log(tokenNoMessage);  
//                 res.status(200).json( tokenNoMessage );
//             } 
//             else {
//                 console.log("No duplicate TokenNo found.");
//             }
//         }
//     } 
//     catch (err) {
//         console.error('SQL error:', err);
//         res.status(500).json({ success: false, message: 'Failed to insert data' });
//     } 
//     finally {
//         sql.close(); 
//     }
// });

// const port = 3000;
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });



/////////////////////////////////////////////////////////////////////////////////////////


const sql = require('mssql');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
const ip=require('./getIp')

const config=require('./config/database')
const first_routing=require('./routers/first_routing')

// app.use('/students',)
app.use(express.json());  // This will parse incoming JSON payloads
// app.use(cors());
app.use(cors({
    // origin: 'http://localhost:5500'
    origin: '*'
}));
// app.use(morgan('combined'));


///////////////////
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later."
});
// Apply the rate limiter to all routes
app.use(limiter);

/////////////////////



// app.use('/home',fun);
// function fun(req,res,next) {
//     const dt=new Date();
//     console.log(`[${dt}] ${req.method} request to ${req.url}`);
//     next();
    
    
// }
app.get('/', async (req, res) => {
    res.setHeader('home', 'Welcome to the homepage'); // Set a custom header named 'home'
    res.send('home'); // Respond with "home" for the root route
});

app.get('/home', async (req, res) => {
    res.setHeader('home', 'About Page Header'); // Set the same custom header on this route, if needed
    res.send('about'); // Respond with "about" for the "/home" route
});


app.use('/first',first_routing);

app.get('/students',async(req,res)=>{
try{
    let pool = await sql.connect(config);
    const result = await pool.request()    
    .execute('show_data');  

console.log(result);
res.status(200).json({ result});

}
catch (err) {
    console.error('SQL error:', err);
    res.status(500).json({ success: false, message: 'Failed to get data' });
} 
finally{
    sql.close(); 

}
    
});


app.post('/students', async (req, res) => {



    const reqtype=req.body;
   
    if (!reqtype || Object.keys(reqtype).length === 0) 
    {
        return res.status(404).send('No data found'); 
    }
    const validationErrors = [];
    var flag=0

    const { data } = req.body.body;
    if(reqtype.body && reqtype.body.type==="TPFGRetrieveRequest")
    {

        //console.log("The request type is TPFGRetrieveRequest");
        data.forEach((item, index) => {
     
    
            if (!("TokenNo" in item)) {
                validationErrors.push(`body.data[${index}].TokenNo: The TokenNo field is missing.`);
            } else if (item.TokenNo === null || item.TokenNo === '') {
                validationErrors.push(`body.data[${index}].TokenNo: The TokenNo field should not be null or empty.`);
            }
    
            if (!("ItemCode" in item)) {
                validationErrors.push(`body.data[${index}].ItemCode: The ItemCode field is missing.`);
            } else if (item.ItemCode === null || item.ItemCode === '') {
                validationErrors.push(`body.data[${index}].ItemCode: The ItemCode field should not be null or empty.`);
            }
    
            if (!("SalesOrder" in item)) {
                validationErrors.push(`body.data[${index}].SalesOrder: The SalesOrder field is missing.`);
            } else if (item.SalesOrder === null || item.SalesOrder === '') {
                validationErrors.push(`body.data[${index}].SalesOrder: The SalesOrder field should not be null or empty.`);
            }
    
            if (!("STOOrder" in item)) {
                validationErrors.push(`body.data[${index}].STOOrder: The STOOrder field is missing.`);
            } else if (item.STOOrder === null || item.STOOrder === '') {
                validationErrors.push(`body.data[${index}].STOOrder: The STOOrder field should not be null or empty.`);
            }
    
            if (!("ReturnableGateNo" in item)) {
                validationErrors.push(`body.data[${index}].ReturnableGateNo: The ReturnableGateNo field is missing.`);
            } else if (item.ReturnableGateNo === null || item.ReturnableGateNo === '') {
                validationErrors.push(`body.data[${index}].ReturnableGateNo: The ReturnableGateNo field should not be null or empty.`);
            }
    
            if (!("BatchNo" in item)) {
                validationErrors.push(`body.data[${index}].BatchNo: The BatchNo field is missing.`);
            } else if (item.BatchNo === null || item.BatchNo === '') {
                validationErrors.push(`body.data[${index}].BatchNo: The BatchNo field should not be null or empty.`);
            }
    
            if (!("Quantity" in item)) {
                validationErrors.push(`body.data[${index}].Quantity: The Quantity field is missing.`);
            } else if (item.Quantity === null || item.Quantity === '') {
                validationErrors.push(`body.data[${index}].Quantity: The Quantity field should not be null or empty.`);
            }
            
        });

    }
    else
    {
        flag=1;
        validationErrors.push("The request type is not TPFGRetrieveRequest");
        console.log("The request type is not TPFGRetrieveRequest");
    }



   

    if (validationErrors.length > 0 )
    {
        if( flag==0)
        {
        return res.status(400).json({
            title: "One or more validation errors occurred.",
            status: 400,
            errors: {
                validation: validationErrors
            }
        });
        }
        else
        {
            return res.status(400).send(validationErrors)
        }
    }

    const extractedData = data.map(item => ({
        TokenNo: item.TokenNo,
        ItemCode: item.ItemCode,
        SalesOrder: item.SalesOrder,
        STOOrder: item.STOOrder,
        ReturnableGateNo: item.ReturnableGateNo,
        BatchNo: item.BatchNo,
        Quantity: item.Quantity
        
    }));

    try {
        let pool = await sql.connect(config);
        
        const tvp = new sql.Table('UDT_FG_Req');
        tvp.columns.add('TokenNo', sql.NVarChar(50));
        tvp.columns.add('ItemCode', sql.NVarChar(50));
        tvp.columns.add('SalesOrder', sql.NVarChar(50));
        tvp.columns.add('STOOrder', sql.NVarChar(50));
        tvp.columns.add('ReturnableGateNo', sql.NVarChar(50));
        tvp.columns.add('BatchNo', sql.NVarChar(50));
        tvp.columns.add('Quantity', sql.NVarChar(50));


        extractedData.forEach(item => {
            tvp.rows.add(item.TokenNo, item.ItemCode,item.SalesOrder, item.STOOrder,item.ReturnableGateNo, item.BatchNo,item.Quantity);
        });

        const result = await pool.request()
            .input('UDT_FG_Req', tvp)
            .execute('sp_ERP_FG_Retrieve_Request');  

        console.log(result);
        
       // res.status(200).json({ success: true, message: 'Data inserted successfully' });
       if (result.recordset === undefined || result.recordset.length === 0) 
        {
          console.log("Insert successfully.");
          res.status(200).json({ success: true, message: 'Data inserted successfully' });
        } 
        else 
        {
            const duplicateTokenNos = result.recordset.map(row => row.TokenNo);
        
            if (duplicateTokenNos.length > 0) {
                const tokenNoMessage = `TokenNo ${duplicateTokenNos.join(', ')} is duplicate.`;
                console.log(tokenNoMessage);  
                res.status(200).json( tokenNoMessage );
            } 
            else {
                console.log("No duplicate TokenNo found.");
            }
        }
    } 
    catch (err) {
        console.error('SQL error:', err);
        res.status(500).json({ success: false, message: 'Failed to insert data' });
    } 
    finally {
        sql.close(); 
    }
});


// app.post('/data',async(req,res)=>{
//     let pool = await sql.connect(config);
//     const result = await pool.request()   
//         .input('@json',) 
//         .execute('json_input');  
//     //const data=req.body;
//     console.log(result);
//     res.status(200).send(result);
    

// })

app.post('/data', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        const jsonData = JSON.stringify(req.body); // Stringify JSON input
        const result = await pool.request()
            .input('@json', sql.NVarChar(sql.MAX), jsonData) // pass the JSON string
            .execute('json_input');

        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port} and ip : ${ip}`);
});
