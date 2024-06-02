import { data } from "../utils/statSummaryData";
import { LuEye } from "react-icons/lu";
import { TbCapture } from "react-icons/tb";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";

const StatSummaryConatiner = () => {
  return (
    <div className="p-4 flex gap-8 flex-wrap">
      {data?.map((eachData) => {
        return (
          <div
            key={eachData._id}
            className="bg-[#24304b] rounded-xl p-4 lg:w-2/12 md:w-3/12 w-5/12"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm opacity-30">{eachData.fieldName}</span>
              <span>
                {eachData.iconType === 1 ? (
                  <LuEye className="text-yellow-400" />
                ) : eachData.iconType === 2 ? (
                  <TbCapture className="text-purple-400" />
                ) : eachData.iconType === 3 ? (
                  <AiOutlineUserAdd className="text-[#eb5757]" />
                ) : (
                  <FaRegHeart className="text-[#27ae60]" />
                )}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">{eachData.value}</span>
              <span className="text-[#00f6ff] text-xs">{eachData.percent}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatSummaryConatiner;
