import React, { PureComponent } from 'react';
import { PieChart, Pie, Tooltip, Sector, Cell, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';


const data = [
    { name: "Diseño", value: 8 },
    { name: "Ingeniería", value: 2 },
    { name: "Administración", value: 1 },
    { name: "Oficios", value: 1 },
    { name: "Salud", value: 1 },
    { name: "Economía", value: 1 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#cccccc', '#ccccff'];


const contratadosMes = [
    { name: "Contratados", value: 14 },
    { name: "No Contratados", value: 28 },
];
const COLORS2 = ['#0088FE', '#CCC'];




const dataBar = [
    {
        name: 'Sr Product Designer',
        postulados: 40,
        aptos: 2,
    },
    {
        name: 'Product Designer',
        postulados: 20,
        aptos: 4,
    },
    {
        name: 'Diseñador Ux/Ui',
        postulados: 6,
        aptos: 1,
    },

];

const dataPublic = [
    {
        name: 'CSTI Corp',
        publicados: 10,
        ocupados: 2,
    },
    {
        name: 'Heydru Eirl',
        publicados: 4,
        ocupados: 5,
    },
    {
        name: 'Bussiness Company SAC',
        publicados: 6,
        ocupados: 4,
    },

];

export const Reports = () => {
    // static demoUrl = 'https://codesandbox.io/s/tiny-bar-chart-35meb';


    return (
        <>
            <h2 className="mb-4">Reportes</h2>

            <i className="tabsection">** Cantidad de empleos por especialidad publicados : 14</i>
            <PieChart width={800} height={400} >
                <Pie
                    data={data}
                    cx={120}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                >

                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>

            <div>
                <div className="dflex flex-row jc-sb">
                    <strong>Especialidad</strong>
                    <span>Valor en %</span>
                </div>
                <hr />

                {data.map((dat) => (
                    <div className="w-100">
                        <div className="dflex flex-row jc-sb">
                            <span>  {dat.name}</span>
                            <span className="hide-caracter">{dat.value / (1 * 0.14)}</span>
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
            <br /> <br /><br />
            <i className="tabsection">** Cantidad de postulantes que fueron contratados en el ultimo mes</i>
            <PieChart width={800} height={400} >
                <Pie
                    data={contratadosMes}
                    cx={120}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                >

                    {contratadosMes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
            <div>
                <div className="dflex flex-row jc-sb">
                    <strong>Condición</strong>
                    <span>Valor en %</span>
                </div>
                <hr />

                {contratadosMes.map((dat) => (
                    <div className="w-100">
                        <div className="dflex flex-row jc-sb">
                            <span>  {dat.name}</span>
                            <span className="hide-caracter">{dat.value / (1 * 0.42)}</span>
                        </div>
                        <hr />
                    </div>
                ))}
            </div>

            <br /><br />         <br /><br />
            <i className="tabsection">** Cantidad de postulantes aptos por puestos publicados</i>
            <br /><br />         <br /><br />
            <BarChart
                width={1000}
                height={300}
                data={dataBar}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="aptos" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="postulados" fill="#82ca9d" />
            </BarChart>

            <br /><br />         <br /><br />
            <i className="tabsection">** Cantidad de plazas cubiertas publicadas por empresas</i>
            <br /><br />         <br /><br />
            <BarChart
                width={1000}
                height={300}
                data={dataPublic}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="ocupados" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="publicados" fill="#82ca9d" />
            </BarChart>

        </>
    );
};
