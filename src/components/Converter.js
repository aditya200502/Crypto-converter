import React, { useEffect, useState } from 'react';
import { RiCoinsFill } from 'react-icons/ri';
import { Button, Card, Form, Input, Select } from 'antd';
import './Converter.css'

function Converter() {

    const [cryptoList, setcryptoList] = useState([]);
    const apiUrl = 'https://api.coingecko.com/api/v3/exchange_rates';

    const [inputVal, setinputVal] = useState("0");
    const [firstSelect, setFirstSelect] = useState("Bitcoin");
    const [secondSelect, setSecondSelect] = useState("Ether");
    const [result, setResult] = useState("0");

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const response = await fetch(apiUrl);
        const jsonData = await response.json();

        const data = jsonData.rates;

        // console.log(Object.entries(data));
        // const temparray = [];
        // Object.entries(data).forEach(item => {
        //     const tempObj = {
        //         value: item[1].name,
        //         label: item[1].name,
        //         rate: item[1].value
        //     }
        //     temparray.push(tempObj);
        // })

        const temparray = Object.entries(data).map(item => {
            return {
                value: item[1].name,
                label: item[1].name,
                rate: item[1].value
            }
        })


        // console.log(temparray);

        setcryptoList(temparray);
    }

    useEffect(() => {

        if (cryptoList.length == 0) return;

        //console.log(inputVal,firstSelect,secondSelect);

        const firstSelectRate = cryptoList.find((item) => {
            return item.value === firstSelect;
        }).rate;

        const secondSelectRate = cryptoList.find((item) => {
            return item.value === secondSelect;
        }).rate;

        const resultValue = (inputVal * secondSelectRate) / firstSelectRate;

        setResult(resultValue.toFixed(4));

        // console.log(firstSelectRate,secondSelectRate);

    }, [inputVal, firstSelect, secondSelect])

    return (
        <div className='container'>
            <Card className='crypto-card' title={<h1> <RiCoinsFill /> Crypto Converter</h1>}>
                <Form size='large'>
                    <Form.Item>
                        <Input onChange={(event) => setinputVal(event.target.value)} />
                    </Form.Item>
                </Form>
                <div className='select-box'>
                    <Select onChange={(value) => setFirstSelect(value)} style={{ width: '200px' }} defaultValue="Bitcoin" options={cryptoList} />
                    <Select onChange={(value) => setSecondSelect(value)} style={{ width: '200px' }} defaultValue="Ether" options={cryptoList} />
                </div>
                <p>{inputVal} {firstSelect} = {result} {secondSelect}</p>
            </Card>
        </div>
    )
}

export default Converter