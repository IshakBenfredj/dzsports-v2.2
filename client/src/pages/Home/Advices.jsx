import Title from '../../components/Parts/Title'

const Advices = () => {
  const advices = [
    {
      title: "تحديد الهدف",
      content: " قبل البدء في الرياضة، يجب عليك تحديد هدفك المرجو من الرياضة التي ترغب في تعلمها، سواء كان ذلك لفقدان الوزن، زيادة اللياقة البدنية، بناء العضلات أو أي هدف آخر.",
    },
    {
      title: "استشارة الطبيب",
      content: "قبل البدء في ممارسة الرياضة، ينبغي عليك استشارة الطبيب، وخاصة إذا كان لديك أي أمراض أو حالات صحية مثل ضغط الدم، الربو أو السكري، للتأكد من أنها آمنة بالنسبة لك.",
    },
    {
      title: "اختيار النشاط المناسب",
      content: "يجب أن تختار نشاطًا يناسب قدراتك البدنية ومستوى لياقتك، ويجب أن يكون ممتعًا بالنسبة لك حتى تستمر فيه.",
    },
    {
      title: "تعيين جدول زمني",
      content: "ينصح بتحديد جدول زمني لممارسة الرياضة بشكل منتظم، مثل ثلاث مرات في الأسبوع، حتى تتمكن من الالتزام بالتدريب وتحقيق النتائج المرجوة.",
    },
    {
      title: "اختيار النادي المناسب",
      content: "ينبغي أن تختار ناديًا يناسب احتياجاتك ويوفر الأدوات والمعدات اللازمة لممارسة الرياضة التي تريد تعلمها.",
    },
    {
      title: "التعلم من المدربين المؤهلين",
      content: "ينبغي أن تتعلم من مدربين مؤهلين وذوي خبرة للحصول على النصائح الصحيحة والإرشادات اللازمة لتحسين تقنياتك وتقليل فرص الإصابة",
    },
    {
      title: "تعلم الأساسيات",
      content: " تعلم الأساسيات والتقنيات الصحيحة للرياضة التي تريد ممارستها، وحاول ممارسة الرياضة بشكل منتظم لتحسين مهاراتك.",
    },
    {
      title: "تناول الغذاء الصحي",
      content: "تناول وجبات صحية ومتوازنة وشرب كمية كافية من الماء قبل وبعد التمرين.",
    },
    {
      title: "الراحة والاسترخاء",
      content: "لا تنسى أن تعطي جسمك الراحة والاسترخاء اللازمين بين التمارين، فالراحة الجيدة تساعد على تجنب الإصابات وتحسين أدائك في الرياضة.",
    },
    {
      title: "التحفيز والإيجابية",
      content: " حافظ على التحفيز والإيجابية، ولا تيأس إذا كنت تواجه تحديات في التعلم أو التمرن",
    },
  ];
  const showContent = (index) => {
    document.querySelectorAll('.advice').forEach((advice,i) => {
      if (i === index) {
        advice.classList.toggle('open');  
      } else {
        advice.classList.remove('open');
      }
    })
  }
  return (
    <>
    <section className="container" id='advices'>
        <Title title='نصائح DZSPORTS' />
        <p className="advicesIntro">
          إذا كنت ترغب في تعلم رياضة جديدة والانضمام إلى صالة رياضية أو نادي، فإليك بعض النصائح التي يمكن أن تساعدك على البدء بشكل صحيح والاستفادة القصوى من تجربتك:
        </p>
        <div className="advices flex flex-col mx-auto gap-2">
            {
                advices.map((advice,index)=> 
                <div className="advice" key={index}>
                    <div className="adviceTitle text-xl text-white" onClick={()=>showContent(index)}>
                      <span>{advice.title}</span>
                      <i className="uil uil-angle-down"></i>
                    </div>
                    <div className="content">
                      <div className="adviceContent">
                        {advice.content}
                      </div>
                    </div>
                </div>
                )
            }
        </div>
    </section>
    </>
  );
};

export default Advices;
