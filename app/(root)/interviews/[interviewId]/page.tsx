import Agent from "@/components/Agent/Agent";
import ScoreCircle from "@/components/score";
import { getInterViewById } from "@/lib/actions/interview.actions";
import { refactorCompany } from "@/lib/helpers/general";

const page = async ({ params }: any) => {
  const { interviewId } = await params;
  const { data: interview } = await getInterViewById(interviewId);

  return (
    <div className="pb-10 pt-[100px] mt-[-60px] w-full bg-gradient-to-b from-primary1/50 via-dark1/50  to-dark1 relative">
      <div className="flex flex-col w-full">
        <div className=""></div>
        <div className="absolute">
          <img className="opacity-[0.11]" src="/media/images/logo.png" />
        </div>
        {interview && (
          <Agent
            interview={{
              ...interview,
              createdAt: interview.createdAt.toISOString(),
              updatedAt: interview.updatedAt.toISOString(),
            }}
          />
        )}
        <div className="mt-5 w-full rounded-full ">
          <div className="grid place-content-start  md:grid-cols-[250px_1fr] gap-4 w-full max-w-[1320px] mx-auto px-4 h-full  min-h-[50vh]">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 shadow-xl border border-dark1/10 w-full h-full flex flex-col items-center">
              <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md mb-4">
                <img
                  src={`https://logo.clearbit.com/${refactorCompany(
                    interview?.company as string
                  )}`}
                  alt={refactorCompany(interview?.company as string)}
                  className="w-full h-full rounded-full  object-fit"
                />
              </div>
              <div>
                <p className="capitalize font-semibold">previous scores</p>
                <div className="py-2">
                  <ScoreCircle interviewId={interviewId} />
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 shadow-xl border border-dark1/10 w-full h-full">
              <h2 className="pl-6  w-full mx-auto font-semibold text-2xl text-white pt-10">
                You are now attending a sample{" "}
                <span className="text-primary1">{interview?.role}</span>{" "}
                interview
              </h2>
              <ul className="pl-8  w-full mx-auto text-[15px]  opacity-55 mt-2 py-7 font-semibold list-disc flex flex-col gap-y-4">
                <li>
                  If you are ready to start the interview, please click on the{" "}
                  <span className="text-primary1">Call</span> button
                </li>
                <li>
                  This interview is for the{" "}
                  <span className="">{interview?.role}</span> role.
                </li>
                <li>
                  You will be asked a total of {interview?.questions.length} and
                  your score will be out of 100%
                </li>
                <li>
                  This is a {interview?.level} interview and s is a{" "}
                  {interview?.type} type of interview{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
