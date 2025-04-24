import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export default function Chart(props){
    return(

        <div>
           <h2 className="text-xl font-bold">{props.data.chartHead}</h2>
            <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${props.data.chart.url}`} alt="chart data" className="w-full h-auto mb-6 rounded-lg shadow-md"/>
            <BlocksRenderer content={props.data.chartFooter} />
        </div>
   
    )
         
}