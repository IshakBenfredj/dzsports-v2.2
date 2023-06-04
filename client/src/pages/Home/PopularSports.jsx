import { useEffect } from 'react'

import Title from '../../components/Parts/Title'
import football from '../../assets/football.jpg'
import karati from '../../assets/karati.jpg'
import jido from '../../assets/jido.jpg'
import kamal from '../../assets/kamal.jpg'
import swiming from '../../assets/swiming.jpg'
import kickboxing from '../../assets/kickboxing.jpeg'
import molakma from '../../assets/molakma.jpg'

const PopularSports = () => {

  useEffect(()=>{
    const sports = document.querySelectorAll('.imgBox');
    sports.forEach( (sport,index) => {
      sport.addEventListener('click',()=>{
        const modal = document.querySelectorAll('.modal');
        const modalClose = document.querySelectorAll('.modalClose');
        modal[index].classList.remove('hidden');
        modalClose[index].addEventListener('click',()=>{
          modal[index].classList.add('hidden');
        })
      })
    })
  },[])

  return (
    <section className='container' id='popularSports'>
        <Title title='الرياضات الشائعة' />
        <div className="sports flex gap-4 flex-wrap justify-center">
          <div className="sport">
            <div className="imgBox rounded w-full h-full cursor-pointer overflow-hidden">
              <img src={kamal} className=' object-cover w-full h-full' alt="Football Imagee"/>
              <div className="sportName absolute text-white text-xl">كمال الأجسام</div>
            </div>
            <div className="modal hidden">
              <div className="modalBox">
                <div className="modelHead flex justify-between items-center">
                  <div className="modalTitle">كمال الأجسام</div>
                  <i className="uil uil-times-square modalClose cursor-pointer"></i>
                </div>
                <div className="modalInfo">
                  رياضة كمال الأجسام هي رياضة تهتم بتطوير وبناء العضلات وتحسين القدرة على التحمل والقوة البدنية. يقوم المتدرب في هذه الرياضة بتمارين محددة تستهدف تحسين مختلف العضلات في الجسم، مع استخدام الأوزان والأدوات المختلفة.
                  تحتاج رياضة كمال الأجسام إلى اتباع نظام غذائي صحي ومتوازن يحتوي على الكميات اللازمة من البروتينات والكربوهيدرات والدهون لتعزيز نمو العضلات والحفاظ على صحة الجسم.
                  تحتوي رياضة كمال الأجسام على فئات مختلفة تنافس فيها المتدربين بناءً على مستواهم ووزنهم وعمرهم. وتعتبر هذه الرياضة شديدة التحدي، فهي تتطلب صبرًا وانضباطًا كبيرًا لتحقيق النتائج المرجوة.
                  علاوة على ذلك، فإن رياضة كمال الأجسام تعزز الثقة بالنفس وتحسن الصحة العامة للجسم، وتقلل من خطر الإصابة بالعديد من الأمراض المزمنة مثل أمراض القلب والسكري وارتفاع ضغط الدم.
                  في النهاية، فإن رياضة كمال الأجسام هي رياضة ممتعة ومجزية لتحسين الصحة العامة وتطوير القوة البدنية والعضلات. ويمكن لأي شخص، بغض النظر عن العمر أو المستوى اللياقي، ممارسة هذه الرياضة والاستمتاع بها.
                </div>
              </div>
            </div>
          </div>
          <div className="sport">
            <div className="imgBox rounded w-full h-full cursor-pointer overflow-hidden">
              <img src={karati} className=' object-cover w-full h-full' alt="Karatih Imagee"/>
              <div className="sportName absolute text-white text-xl">الكراتيه</div>
            </div>
            <div className="modal hidden">
              <div className="modalBox">
                <div className="modelHead flex justify-between items-center">
                  <div className="modalTitle">الكراتيه</div>
                  <i className="uil uil-times-square modalClose cursor-pointer"></i>
                </div>
                <div className="modalInfo">
                  الكاراتيه هي رياضة قتالية يابانية تعتمد على استخدام الأيدي والأرجل كوسيلة للدفاع والهجوم. يتضمن تعليم الكاراتيه تعلم تقنيات مختلفة مثل اللكمات والركلات والرمي والأسر والكسر، ويتم تدريب اللاعبين على تحسين مرونتهم وقوتهم وليونتهم وتحسين تقنياتهم في الهجوم والدفاع.
                  تعتمد فلسفة الكاراتيه على التركيز على النمو الشخصي والروحي بالإضافة إلى تحسين اللياقة البدنية والقدرة على الدفاع عن النفس. يتم تعليم الطلاب أيضًا قيم الاحترام والتواضع والتفاني والتفاني والتعاون والتحدي والصبر والاحتمال.
                  يمارس الكاراتيه بشكل عام في مقصورات خاصة بالصالات الرياضية، ويمكن للمتدربين البدء في التعلم في سن مبكرة واستمرارهم في هذه الرياضة طوال حياتهم. يشارك الرياضيون في البطولات والمسابقات المختلفة، ويتم تقييمهم وتصنيفهم وفقًا لمستوياتهم الفنية والرياضية.
                  بشكل عام، الكاراتيه هي رياضة شيقة وممتعة ومفيدة للصحة واللياقة البدنية والروحية. إنها تساعد على تحسين التركيز والثقة بالنفس والقدرة على الانضباط الذاتي والتحكم في العواطف. إذا كنت ترغب في البدء في ممارسة الكاراتيه، فلا تتردد في التسجيل في صالة رياضية محلية والانضمام إلى فصول التدريب المناسبة لمستواك.
                </div>
              </div>
            </div>
          </div>
          <div className="sport">
            <div className="imgBox rounded w-full h-full cursor-pointer overflow-hidden">
              <img src={football} className=' object-cover w-full h-full' alt="Football Imagee"/>
              <div className="sportName absolute text-white text-xl">كرة القدم</div>
            </div>
            <div className="modal hidden">
              <div className="modalBox">
                <div className="modelHead flex justify-between items-center">
                  <div className="modalTitle">كرة القدم</div>
                  <i className="uil uil-times-square modalClose cursor-pointer"></i>
                </div>
                <div className="modalInfo">
                  كرة القدم هي رياضة جماعية شعبية جداً حول العالم، حيث يتنافس فريقان من 11 لاعبًا لكل فريق على تسجيل الأهداف في مرمى الفريق الآخر باستخدام القدمين وأي جزء آخر من الجسم بإستثناء اليدين.
                  تتضمن لعبة كرة القدم العديد من المهارات الأساسية مثل التمرير والتسديد والمراوغة والتحكم في الكرة. يتم تعليم هذه المهارات عن طريق التدريب المستمر والتكرار وتحسين اللياقة البدنية.
                  تعتمد فلسفة كرة القدم على العمل الجماعي والتنسيق بين اللاعبين. ويتطلب الأمر من اللاعبين التفاعل والتواصل والتعاون لتحقيق الهدف المشترك، ويتم تعليم اللاعبين أيضًا قيم الاحترام والتضحية والتفاني والتعاون والعمل الجماعي.
                  تشتهر كرة القدم بالمسابقات الكبرى مثل كأس العالم ودوري أبطال أوروبا، حيث يتنافس أفضل الفرق واللاعبين على اللقب والميداليات.
                  بشكل عام، كرة القدم هي رياضة مسلية وممتعة ومفيدة للصحة واللياقة البدنية. إنها تساعد على تحسين التركيز والثقة بالنفس والقدرة على الانضباط الذاتي والتحكم في العواطف. إذا كنت ترغب في البدء في ممارسة كرة القدم، فلا تتردد في الانضمام إلى فريق محلي أو التسجيل في صالة رياضية محلية والانضمام إلى فصول التدريب المناسبة لمستواك.
                </div>
              </div>
            </div>
          </div>
          <div className="sport">
            <div className="imgBox rounded w-full h-full cursor-pointer overflow-hidden">
              <img src={jido} className=' object-cover w-full h-full' alt="Jido Imagee"/>
              <div className="sportName absolute text-white text-xl">الجيدو</div>
            </div>
            <div className="modal hidden">
              <div className="modalBox">
                <div className="modelHead flex justify-between items-center">
                  <div className="modalTitle">الجيدو</div>
                  <i className="uil uil-times-square modalClose cursor-pointer"></i>
                </div>
                <div className="modalInfo">
                  رياضة الجيدو هي رياضة قتالية يابانية تركز على استخدام التقنيات الحركية والتحكم في القوة لإسقاط الخصم على الأرض وتثبيته. يستخدم المتدربون في هذه الرياضة اللكمات والركلات والرميات والاستعراضات بشكل مدروس لإعادة توازن الخصم وتحريكه على الأرض.
                  يتميز الجيدو بأنه رياضة تطويرية شاملة، تعزز اللياقة البدنية والصحة العامة، وتحسن التنسيق بين الجسم والعقل. كما أنها تعلم الانضباط والتركيز والتحكم في العواطف، مما يساعد على تحسين الثقة بالنفس والتفكير الإيجابي.
                  يتم تعليم الجيدو بشكل نمطي في الصالات الرياضية والمدارس والأندية الرياضية، ويمكن للأشخاص من جميع الأعمار والمستويات البدنية الاستمتاع بها. بالإضافة إلى ذلك، يمكن لممارسي الجيدو الموهوبين المنافسة في البطولات والمسابقات المحلية والدولية، وتمثيل بلدهم في الألعاب الأولمبية.
                  في النهاية، يمكن القول إن رياضة الجيدو هي رياضة شيقة ومثيرة تجمع بين الفن والقوة والتحكم الذاتي، وتعمل على تحسين صحة الجسم والعقل والروح.
                </div>
              </div>
            </div>
          </div>
          <div className="sport">
            <div className="imgBox rounded w-full h-full cursor-pointer overflow-hidden">
              <img src={swiming} className=' object-cover w-full h-full' alt="Swiming Imagee"/>
              <div className="sportName absolute text-white text-xl">السباحة</div>
            </div>
            <div className="modal hidden">
              <div className="modalBox">
                <div className="modelHead flex justify-between items-center">
                  <div className="modalTitle">السباحة</div>
                  <i className="uil uil-times-square modalClose cursor-pointer"></i>
                </div>
                <div className="modalInfo">
                  رياضة السباحة هي إحدى الرياضات الشعبية والمفضلة لدى العديد من الأشخاص حول العالم، وتتميز بالعديد من الفوائد الصحية والنفسية.
                  تعتبر السباحة رياضة كاملة للجسم حيث تعمل على تنشيط عضلات الجسم بشكل شامل، وتساعد على تحسين اللياقة البدنية والقدرة على التحمل. كما أنها تقلل من خطر الإصابة بالأمراض المزمنة مثل أمراض القلب والسكري وارتفاع ضغط الدم، وتعزز صحة الجهاز التنفسي والعضلي الهيكلي.
                  تتضمن رياضة السباحة العديد من الأنماط والتقنيات المختلفة مثل السباحة الحرة والظهر والصدر والفراشة، وتحتاج إلى تدريب مستمر للتحسين فيها وزيادة السرعة والمهارة.
                  تتميز رياضة السباحة بأنها تناسب جميع الأعمار والمستويات الرياضية، حيث يمكن للأطفال والبالغين وكبار السن ممارسة هذه الرياضة بدون تأثير كبير على الجسم.
                  إضافةً إلى ذلك، تمتاز رياضة السباحة بأنها تساعد على تخفيف التوتر والإجهاد وتحسين الصحة النفسية والعاطفية، كما أنها توفر فرصة للتعرف على أصدقاء جدد والتواصل مع المجتمع.
                  بالإضافة إلى كل ذلك، تعد رياضة السباحة مثالية للتمتع بالطبيعة والاستمتاع بالمياه، سواء كان في المسابح أو البحار أو الأنهار.
                  بشكل عام، تعتبر رياضة السباحة إحدى الرياضات الأساسية والممتعة والمفيدة للجسم والعقل، وي
                </div>
              </div>
            </div>
          </div>
          <div className="sport">
            <div className="imgBox rounded w-full h-full cursor-pointer overflow-hidden">
              <img src={kickboxing} className=' object-cover w-full h-full' alt="Swiming Imagee"/>
              <div className="sportName absolute text-white text-xl">الكيك بوكسينغ</div>
            </div>
            <div className="modal hidden">
              <div className="modalBox">
                <div className="modelHead flex justify-between items-center">
                  <div className="modalTitle">الكيك بوكسينغ</div>
                  <i className="uil uil-times-square modalClose cursor-pointer"></i>
                </div>
                <div className="modalInfo">
                  الكيك بوكسينغ هي رياضة قتالية تجمع بين الركل واللكم والضرب باليدين. تعتمد الرياضة على تقنيات القتال الآسيوية والغربية، وتم تطويرها في السبعينيات من القرن الماضي في اليابان والولايات المتحدة الأمريكية.
                  يشتمل تدريب الكيك بوكسينغ على تعلم تقنيات مختلفة للركل واللكم والضرب، وتعزيز لياقة الجسم والقوة العضلية والتحمل. يعتمد المبارزون في الكيك بوكسينغ على القوة والسرعة والتحكم الجيد في الجسم والتركيز والتكيف مع المواقف المختلفة.
                  تحظى الكيك بوكسينغ بشعبية كبيرة في جميع أنحاء العالم، ويتم تنظيم العديد من المنافسات والبطولات الدولية والإقليمية في الرياضة. وتتطلب المباريات في الكيك بوكسينغ احترام قواعد محددة، مثل الاستعداد الجيد وارتداء المعدات اللازمة والتزام اللجان الحكمية بتطبيق القواعد وتوزيع النقاط.
                  يمكن للكيك بوكسينغ أن تكون رياضة قوية ومجهدة، ولكنها تعتبر أيضاً رياضة ممتعة ومفيدة للصحة واللياقة البدنية. يمكن لأي شخص البدء في تعلم الكيك بوكسينغ، سواء كان ذلك لأغراض اللياقة البدنية أو للمشاركة في المنافسات.
                </div>
              </div>
            </div>
          </div>
          <div className="sport">
            <div className="imgBox rounded w-full h-full cursor-pointer overflow-hidden">
              <img src={molakma} className=' object-cover w-full h-full' alt="Swiming Imagee"/>
              <div className="sportName absolute text-white text-xl">الملاكمة</div>
            </div>
            <div className="modal hidden">
              <div className="modalBox">
                <div className="modelHead flex justify-between items-center">
                  <div className="modalTitle">الملاكمة</div>
                  <i className="uil uil-times-square modalClose cursor-pointer"></i>
                </div>
                <div className="modalInfo">
                  رياضة الملاكمة هي رياضة قتالية يتنافس فيها متبارون يستخدمون الأيدي للضرب والدفاع عن النفس داخل حلبة القتال. يعتبر الملاكمة من أقدم الرياضات القتالية التي تمارس حتى اليوم وتتطلب مهارة وقوة بدنية كبيرة.
                  تنقسم مباريات الملاكمة إلى جولات، وتستمر كل جولة لمدة ثلاث دقائق، مع فترات راحة قصيرة بينها. يستخدم الملاكمون القفازات الخاصة بهم للحماية والتأكد من عدم إيذاء الخصم بشكل خطير. ويتم تحديد الفائز في المباراة عن طريق النقاط التي يحصل عليها اللاعبون عند ضربات ناجحة، أو عند الفوز بالضربة القاضية التي تؤدي إلى إسقاط الخصم.
                  يعتبر الملاكمون من الرياضيين الأكثر احترافية، حيث يتدربون بشكل دائم وشاق لتحسين مهاراتهم ولياقتهم البدنية. وتشمل التدريبات تمارين عديدة، مثل الجري والتمارين العضلية وتمارين تحسين القوة والسرعة.
                  بالإضافة إلى الجوانب البدنية، فإن الملاكمة تعتمد على الذكاء والاستراتيجية في المباريات. فعلى الرغم من أن الهدف الأساسي هو ضرب الخصم وتحقيق النقاط، إلا أن الملاكم الذكي يعرف كيفية استخدام تحركاته وتفادي الضربات للحفاظ على مزاياه والتغلب على الخصم.
                  وتشمل فوائد ممارسة رياضة الملاكمة زيادة اللياقة البدنية والتحكم في الوزن، وتحسين القدرة على التحمل والتحكم في الضغط النفسي، بالإضافة إلى تعزيز الثقة بالنفس
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  )
}

export default PopularSports