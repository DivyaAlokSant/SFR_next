import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export default function DataImage(props) {
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden my-2">
      {/* Header */}
      {props.data.chartHead && (
        <div className="w-full text-lg font-semibold text-gray-700 py-3 rounded-t-lg text-center">
          {props.data.chartHead}
        </div>
      )}
      {/* Image */}
      <img
        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${props.data.chart.url}`}
        alt="chart data"
        className="w-full h-auto mb-0 rounded-none"
      />
      {/* Footer */}
      {props.data.chartFooter && (
        <div className="w-full bg-gray-50 rounded-b-lg px-4 py-1 text-xs italic leading-tight footer-blocks">
          <BlocksRenderer content={props.data.chartFooter} />
        </div>
      )}
    </div>
  );
}