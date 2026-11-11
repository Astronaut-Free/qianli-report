(() => {
"use strict";
const root = document.getElementById("root");
const status = (function createDataStatus(root, { version = "unknown", surface = "chart" } = {}) {
  const doc = root.ownerDocument;
  const layer = root.querySelector("[data-data-status]") ?? doc.createElement("div");
  layer.setAttribute("data-data-status", "");
  if (!layer.parentNode) root.append(layer);
  const redact = value => String(value ?? "")
    .slice(0, 12_000)
    .replace(/https?:\/\/[^\s)]+/giu, url => "[url]" + (url.match(/(?::\d+){1,2}$/u)?.[0] ?? ""))
    .replace(/(?:file:\/\/)?\/(?:Users|home|root|private|tmp|var)\/[^\s):]+/gu, "[path]")
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/giu, "[email]")
    .replace(/\b(?:bearer\s+|(?:token|api[_-]?key|password|secret|authorization)\s*[:=]\s*)[^\s,;]+/giu, "[credential]")
    .replace(/(["'`])[^\n]*?\1/gu, "[quoted value]")
    .slice(0, 4000);
  return {
    ready() {
      layer.remove();
      root.removeAttribute("aria-busy");
    },
    fail(error, stage = "render") {
      if (!layer.parentNode) root.append(layer);
      root.removeAttribute("aria-busy");
      layer.hidden = false;
      layer.setAttribute("role", "alert");
      layer.setAttribute("data-data-status", "error");
      const title = doc.createElement("p");
      title.textContent = "An error occurred inside the visualization.";
      const button = doc.createElement("button");
      button.type = "button";
      button.textContent = "Copy error logs";
      const hint = doc.createElement("p");
      hint.setAttribute("role", "status");
      const logs = JSON.stringify({
        source: "data-plugin", version, surface, stage,
        timestamp: new Date().toISOString(),
        error: { name: redact(error?.name ?? "Error").slice(0, 128), message: redact(error?.message ?? error).slice(0, 1500),
          stack: redact(error?.stack).split("\n").slice(0, 9).join("\n") },
      }, null, 2);
      // Deliberately exclude chart configuration, reviewed rows, HTML and page URLs.
      const text = doc.createElement("textarea");
      text.readOnly = true;
      text.hidden = true;
      text.value = logs;
      text.setAttribute("aria-label", "Error logs");
      button.addEventListener("click", async () => {
        try {
          const clipboard = doc.defaultView?.navigator?.clipboard;
          if (!clipboard?.writeText) throw new Error("Clipboard unavailable");
          await clipboard.writeText(logs);
          hint.textContent = "Error logs copied.";
        } catch {
          text.hidden = false;
          hint.textContent = "Select and copy the error logs below.";
          text.focus();
          text.select();
        }
      });
      layer.replaceChildren(title, button, hint, text);
    },
  };
})(root,{"surface":"report"});
let stage="runtime";
try {
const runtime = globalThis.CodexDataAppRuntime;
if (runtime?.apiVersion !== 1) throw new Error("The embedded dashboard runtime could not load. Rebuild this dashboard.");
stage="data";
const snapshotElement = document.getElementById("data-app-reviewed-snapshot");
const reviewedSnapshot = JSON.parse(snapshotElement.textContent);
runtime.mount({reviewedSnapshot, createContent: (snapshot) => (function(__dataAuthoredRuntime, __dataAuthoredSnapshot) {
"use strict";
const __dataAuthoredData = Object.create(null);
Object.defineProperty(__dataAuthoredData, "__esModule", {value:true});
Object.defineProperty(__dataAuthoredData, "default", {enumerable:true, value:__dataAuthoredSnapshot});
if (__dataAuthoredSnapshot && typeof __dataAuthoredSnapshot === "object") for (const __dataAuthoredKey of Object.keys(__dataAuthoredSnapshot)) {
if (__dataAuthoredKey !== "default" && __dataAuthoredKey !== "__esModule" && __dataAuthoredKey !== "__proto__") Object.defineProperty(__dataAuthoredData, __dataAuthoredKey, {enumerable:true, get:()=>__dataAuthoredSnapshot[__dataAuthoredKey]});
}
Object.freeze(__dataAuthoredData);
const __dataAuthoredAllowed = new Set(JSON.parse("[\"@openai/data-app\",\"react\",\"react-dom\",\"react-dom/client\",\"react-markdown\",\"react/jsx-dev-runtime\",\"react/jsx-runtime\",\"recharts\"]"));
function __dataAuthoredRequire(id) {
if (id === "@openai/data-app-reviewed-snapshot") return __dataAuthoredData;
if (__dataAuthoredAllowed.has(id) && __dataAuthoredRuntime?.modules && Object.prototype.hasOwnProperty.call(__dataAuthoredRuntime.modules,id)) return __dataAuthoredRuntime.modules[id];
throw new Error("Missing bundled Data runtime module: " + id);
}
for (const [__dataAuthoredKey, __dataAuthoredWanted] of JSON.parse("[[\"react/jsx-runtime\",[\"Fragment\",\"__esModule\",\"default\",\"jsx\",\"jsxs\"]],[\"react\",[\"Activity\",\"Children\",\"Component\",\"Fragment\",\"Profiler\",\"PureComponent\",\"StrictMode\",\"Suspense\",\"__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE\",\"__COMPILER_RUNTIME\",\"__esModule\",\"cache\",\"cacheSignal\",\"cloneElement\",\"createContext\",\"createElement\",\"createRef\",\"default\",\"forwardRef\",\"isValidElement\",\"lazy\",\"memo\",\"startTransition\",\"unstable_useCacheRefresh\",\"use\",\"useActionState\",\"useCallback\",\"useContext\",\"useDebugValue\",\"useDeferredValue\",\"useEffect\",\"useEffectEvent\",\"useId\",\"useImperativeHandle\",\"useInsertionEffect\",\"useLayoutEffect\",\"useMemo\",\"useOptimistic\",\"useReducer\",\"useRef\",\"useState\",\"useSyncExternalStore\",\"useTransition\",\"version\"]],[\"@openai/data-app\",[\"Button\",\"Chart\",\"ChartEditor\",\"ChartMark\",\"ChartRenderer\",\"ChartTooltip\",\"ContainedDialog\",\"DataComponent\",\"DataTable\",\"DateRangePicker\",\"Dialog\",\"Dropdown\",\"EditableText\",\"EvidenceChart\",\"ExecutiveSummary\",\"Filters\",\"Icon\",\"InfoTooltip\",\"InlineFilters\",\"Menu\",\"MenuGroup\",\"MenuItem\",\"MenuSeparator\",\"MenuSub\",\"MetricCard\",\"MetricCardTabs\",\"MetricSparkline\",\"NativeSelect\",\"QueryDataBoundary\",\"RangeSlider\",\"ReportSection\",\"RichNarrative\",\"Section\",\"SectionHeader\",\"SectionNavigator\",\"SegmentedControl\",\"Slider\",\"SortableItem\",\"SortableRegion\",\"SourceInspector\",\"SourceSidebar\",\"Switch\",\"TabPanel\",\"Table\",\"Tabs\",\"Tooltip\",\"TruncatedText\",\"__esModule\",\"barChartSpec\",\"chartConfigEntries\",\"chartDataShape\",\"chartSpecKeys\",\"compact\",\"default\",\"displayValue\",\"groupAdditiveCategories\",\"label\",\"normalizeChartAnnotations\",\"percentage\",\"periodComparison\",\"previousPeriodRows\",\"projectChartSpec\",\"resolveChartAnnotations\",\"semanticColorResolver\",\"shortDate\",\"useDashboardTabs\",\"useDataApp\",\"useSectionFilters\"]]]")) {
const __dataAuthoredNamespace = __dataAuthoredRequire(__dataAuthoredKey);
for (const name of __dataAuthoredWanted) if (!Object.prototype.hasOwnProperty.call(__dataAuthoredNamespace,name)) throw new Error("Missing bundled Data export " + name + " from " + __dataAuthoredKey);
}
const __dataAuthoredModule = {exports:Object.create(null)};
(function(module,exports,require){
'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var dataApp = require('@openai/data-app');

// The shared app imports both entrypoints. Keep the inactive dashboard empty.
function DashboardContent() { return null; }

const value$2 = JSON.parse("{\"title\":\"千里复序｜中国与海外行业深度研究\",\"subtitle\":\"中国与海外市场研究 · 2026年11月6日\",\"sections\":[{\"id\":\"decision\",\"title\":\"讨论摘要：先查清五类购买理由，再确认首发\",\"body\":\"## 讨论摘要\\n\\n**当前明确的方向是：理解便携式配件定位，分别研究BP五类产品的竞品，再讨论我们的候选优势。** 这份材料用于与项目伙伴对齐理解，不将首发靠背、个人岗位或产品已量产视为已确认事实。\\n\\n1. **竞品顺序调整。** 先研究同任务便携配件与低复杂度替代；整椅保留为预算替代和技术参照。五类专项对照在“五类竞品”视图，当前有15条，均标明对照关系与缺口。\\n2. **五类都要有独立购买理由。** 主动靠背看支撑和适配；鼠托看输入体验；佩戴式看提醒与持续使用；手触摸式看引导价值；舒颈贴看贴合与温热。统一App只是规划中的协同方式，不能直接当作优势证据。\\n3. **中国与海外同题比较。** 本地型号、版本、价格、售后单独记录。HiPee和成者部分资料较早，YOTOK和国内绿联款尚有匹配缺口，不能当成已核实的当期热销产品。\\n4. **经营模型作为讨论附件保留。** BP的1499元是平均硬件客单；469元是模型单客贡献。首发组合、真实成本、销量和退款仍需相应证据。\\n\\n建议这次与团队确认最新版功能表、首发次序、目标用户与工作分工。研究可以提出推荐，但这些事项由团队决定。\",\"queryId\":\"evidence_decision\",\"blocks\":[]},{\"id\":\"scope\",\"title\":\"产品边界：五类终端按需组合\",\"body\":\"## 01｜先把“我们卖什么”说清楚\\n\\n“模块化”采用用户确认的BP定义：**五类终端按需组合，统一能力接口与协同编排**。现有材料不支持把它扩展成椅内按摩部件任意插拔、自由换位，也未确定任何物理连接器规格。\\n\\n其中的主动升展靠背采用电机与自锁传动；不是气囊路线，也不是整椅升降/后仰电机。背部与座部压力分布是可测信号，但不能直接等同肌肉负荷或椎间盘压力。产品对象是成人日常办公舒适与健康管理。\\n\\n下图来自BP第7页，是产品外观概念。内部机构、传感器、电机电流、供电、电路尺寸及认证类别仍需要工程定义。\\n\\n**产品边界：** 便携配件定位已由团队聊天明确；首发次序、物理适配和新版产品图仍待团队确认。\",\"queryId\":\"evidence_scope\",\"blocks\":[{\"kind\":\"image\",\"id\":\"bp_matrix\",\"asset\":\"bp\",\"caption\":\"图1｜BP原始五型概念图。来源：用户提供BP第7页；非样机实拍。\",\"queryId\":\"image_bp_matrix\"},{\"kind\":\"table\",\"id\":\"table_scope\",\"title\":\"五型范围与首轮验证重点\",\"queryId\":\"scope\",\"columns\":[{\"field\":\"终端\",\"label\":\"终端\",\"link\":false},{\"field\":\"BP定义\",\"label\":\"BP定义\",\"link\":false},{\"field\":\"首要验证\",\"label\":\"首要验证\",\"link\":false},{\"field\":\"商业角色\",\"label\":\"商业角色\",\"link\":false}]}]},{\"id\":\"industry\",\"title\":\"行业有需求，细分机会要用付费与留存界定\",\"body\":\"## 02｜行业边界与需求证据\\n\\n本项目横跨**人体工学办公用品、便携按摩/温热硬件、姿态与生理反馈、健康软件服务**。消费者预算会在这些品类之间替代，但这些市场不能相加成为一个TAM。我们真正服务的是“有合适工作位、确有可改善问题、愿意安装并持续使用、在可接受价格下购买”的交集。\\n\\n[WHO](https://www.who.int/news-room/fact-sheets/detail/low-back-pain)的疾病负担说明问题广泛，不说明人们会买我们的产品。临床证据也不能只挑积极结果：[2021年随机试验](https://www.sjweh.fi/show_abstract.php?abstract_id=3949)纳入193名高风险办公人员，特定主动间歇或姿势变化干预出现积极信号；[2025年Cochrane综述](https://www.cochrane.org/evidence/CD012886_work-break-interventions-preventing-musculoskeletal-symptoms-and-disorders-healthy-workers)汇总9项研究、626人，仍认为整体证据确定性很低。两者合看，支持继续做严格验证，不能证明“提醒更多就更健康”或“自动腰托可以治疗疼痛”。\\n\\n**行业演进方向的判断：** 从一次性放松，转向日常工作中的持续适配；从单点硬件，转向软硬件组合。但产品复杂度也提高：按摩舒服不等于适合一边打字一边使用；更多传感器和提醒也可能增加弃用。\\n\\n**市场规模采用双层口径：** 外部数字只作行业背景；项目销售计划用“合格去重触达人数 × 付费转化 × 实际净客单”构建。合格须同时满足成人桌面办公、目标问题、椅型适配和可交付地区。现在没有足够证据给出可信SAM，不填一个看似精确的亿元数字。\",\"queryId\":\"evidence_industry\",\"blocks\":[{\"kind\":\"table\",\"id\":\"table_market_context\",\"title\":\"市场数字的可用范围\",\"queryId\":\"market_context\",\"columns\":[{\"field\":\"数据\",\"label\":\"数据\",\"link\":false},{\"field\":\"数值与时期\",\"label\":\"数值与时期\",\"link\":false},{\"field\":\"能说明什么\",\"label\":\"能说明什么\",\"link\":false},{\"field\":\"不能推导什么\",\"label\":\"不能推导什么\",\"link\":false}]}]},{\"id\":\"china\",\"title\":\"中国：低价按摩锚点明确，溢价必须来自办公适配\",\"body\":\"## 03｜中国市场分析\\n\\n**阅读范围：** 本章以腰背支撑为主要区域研究对象。它不代表五类产品共同的首发人群或首发方案；五类各自的中国与海外对照见“五类竞品”。\\n\\n**需求判断：** 首批用户应按行为与问题筛选，职业名称仅用于招募。已购买过腰靠或人体工学用品、仍反复调节或不满意支撑的人，比“所有白领”更适合初期验证。购买者和使用者可能不同，B2B必须分别问员工与采购负责人。\\n\\n**竞争与价格：** [米家智能腰背按摩仪](https://m.ithome.com/html/1016344.htm)2026年10月22日报道首销599元、建议零售699元；[米家智能腰部按摩仪2](https://www.ithome.com/1/018/769.htm)报道建议零售499元、众筹379元。这些是有日期的媒体价格，不是当前结算价。国内用户已有“几百元＋App＋热敷＋实体键”的参照。BP平均客单1499元若仅增加模式数量，很难形成清楚的溢价理由。\\n\\n**切入口：** 建议先卖“工作时支撑更适合我、少调节”的可体验结果。展示安装、坐姿变化、键鼠操作和主动/手动对照，比单独展示压力热图更有说服力。压力图用于说明设备检测到什么，不应包装成医疗评估。\\n\\n**渠道：** 第一步用可观察的线下体验与定向内容招募，第二步才用电商承接标准SKU与清晰适配表。可以测试小红书/哔哩哔哩的工位改造内容、产品落地页及企业自愿试用，渠道有效性必须用实际付费和退货后贡献衡量，不能先认定任何平台低CAC。\\n\\n**供应与交付：** 国内试制、返修与面对面观察更便于快速迭代，是启动执行优势；它不自动等于需求最大或售价最高。成本应把机构、接触材料、传感校准、装配、测试、包装与售后放在一起看。单靠PCB便宜不足以让整套产品成立。\\n\\n**主要不利因素，按优先级：** ①被普通腰靠或低价按摩器替代；②椅型适配与舒适差异导致退货；③内容流量与销售费用吃掉贡献；④多终端教育和绑定成本。首轮应在同一目标人群里比较现有用品与我们的样机，避免拿完全不同客群比较满意度。\",\"queryId\":\"evidence_china\",\"blocks\":[{\"kind\":\"table\",\"id\":\"table_china_jobs\",\"title\":\"中国市场：按购买任务选择切入口\",\"queryId\":\"china_jobs\",\"columns\":[{\"field\":\"优先级\",\"label\":\"优先级\",\"link\":false},{\"field\":\"人群与任务\",\"label\":\"人群与任务\",\"link\":false},{\"field\":\"现有选择\",\"label\":\"现有选择\",\"link\":false},{\"field\":\"我们的赢法／失败条件\",\"label\":\"我们的赢法／失败条件\",\"link\":false}]}]},{\"id\":\"us\",\"title\":\"美国：从家庭工位验证溢价，同时计入退货履约\",\"body\":\"## 04｜美国市场分析\\n\\n**阅读范围：** 本章以腰背支撑为主要区域研究对象。它不代表五类产品共同的首发人群或首发方案；五类各自的中国与海外对照见“五类竞品”。\\n\\n**需求证据：** [美国BLS](https://www.bls.gov/cps/cpsaat60.htm)2025年数据显示，参考周内有偿远程/居家工作者约3538.9万人，占在岗人员22.4%。计算机与数学职业占比65.4%。该年是排除10月的11个月平均，不能直接与普通全年均值作增长比较。它支持定向招募家庭或混合办公用户，不能转换成产品订单预测。\\n\\n**价格与替代：** 119.99美元的Snailax按摩靠垫、599.99美元的SIHOO机械人体工学整椅、1019美元的Omni Gen和1169美元的HBADA X7，构成从局部放松到整椅升级的不同选择。不能因为整椅贵，就断言用户愿为外挂靠背支付差价；他们也可能选择便宜靠垫或直接换椅。\\n\\n**建议价值表达：** 优先测试“Upgrade the support of your existing work chair”（升级现有办公椅的支撑体验）及可感知舒适；把适配范围、厚度、安装步骤、停止方式和售后展示清楚。用实际工作任务证明不干扰输入和视频会议，避免只有漂亮的AI动画。\\n\\n**渠道次序：** 定向工位/技术用户研究与小规模DTC → 可验证的产品测评/体验内容 → 有稳定售后后再扩展电商平台与经销。独立站并不天然低获客成本；Amazon也不天然适合需要适配教育的首发产品。测评合作披露商业关系，不能用宣传稿代替独立效果证据。\\n\\n**交付是竞争的一部分：** [Omni美国页](https://libernovo.com/products/libernovo-omni-dynamic-ergonomic-chair)宣传本地仓发货和30天试用；[HBADA美国页](https://hbada.com/products/hbada-x7-smart-ergonomic-chair)提供分地区发货、试用及保修说明。我们的海外方案要同时核算入境运输、税费、仓储、末端配送、退货整备、备件和支持。美国税费/关税随产品归类与时间变化，本报告不把未核定税率写死。\\n\\n**主要不利因素：** ①获客与逆向物流可能抹平高售价；②用户对未知健康品牌及数据收集的信任；③椅型、体型与安装差异；④非医疗定位仍须核定产品安全、无线与健康数据规则。美国是海外首轮需求验证优先项，量产启动仍以当地净贡献和可交付为条件。\",\"queryId\":\"evidence_us\",\"blocks\":[{\"kind\":\"chart\",\"id\":\"chart_us_telework\",\"title\":\"美国远程工作占比（%）\",\"queryId\":\"us_telework\",\"spec\":{\"type\":\"horizontalBar\",\"x\":\"职业\",\"y\":\"远程工作占比(%)\",\"valueDecimals\":1,\"stackable\":false},\"description\":\"BLS CPS 2025：参考周内部分或全部工时远程办公。11个月平均，剔除停摆未采集的10月；职业有层级重叠，不相加，不代表购买意愿。\",\"height\":350}]},{\"id\":\"international\",\"title\":\"欧洲与亚洲海外：不要用一个“出海价”覆盖所有市场\",\"body\":\"## 05｜欧洲、日本与其他海外市场\\n\\n**欧洲需求与购买逻辑。** [Eurofound 2025简报](https://www.eurofound.europa.eu/en/publications/all/hybrid-workplace-ensuring-benefits-for-workers-and-organisations)将家庭工作站人体工学和缺乏结构化休息列为混合办公需要处理的问题。这是场景证据，不是购买本品的调查。适合分别研究家庭办公自费人群与企业提供/补贴设备的流程；不能直接宣称设备减少病假或增加生产率。\\n\\n**欧洲竞争与价格。** [LiberNovo欧盟页](https://eu.libernovo.com/products/libernovo-omni-dynamic-ergonomic-chair)显示1049欧元，同时包含Omni/Omni Gen选项，需核对最终配置。当地售价通常还受税费、语言、保修和配送条款影响；本报告保留原币种与站点，不用汇率换算给出虚假的中外价差。面向欧盟的初始报价应从当地含税到手价倒推贡献。\\n\\n**欧洲进入方式。** 建议先选择一个可提供客服、回收/维修和法律责任安排的国家。技术文件、适用CE框架与GPSR职责要按最终产品确认；健康数据还需单独评估GDPR条件。不能用“一张CE图片”覆盖五种终端、所有无线模块和温热部件。\\n\\n**日本。** [SIHOO日本官网](https://sihoooffice.co.jp/products/sihoo-s300)S300显示107999日元，为本地销售入口和价格参照。暂未取得日本用户针对我们的需求与支付调查，因此不宣称日本市场一定更适合轻薄产品或更愿付费。下一步需实际测椅型、体型、说明书理解和退换服务要求。\\n\\n**新加坡及东南亚。** OSIM的组合化表达有学习价值，但美国站1398美元不能当作新加坡售价，更不能代表整个东南亚购买力。先按国家研究渠道、当地交付和售后伙伴，获得可核验报价后再定SKU与价格。\\n\\n**地区结论：** 中国和海外都保留商业机会；当前建议“中国工程闭环＋美国需求/价格并行验证”，欧洲保留独立验证线。若美国实际退货后贡献明显更好且履约成熟，可调整商业首发顺序；如果国内转化更强且试用成本更低，则优先放量国内。\",\"queryId\":\"evidence_international\",\"blocks\":[{\"kind\":\"table\",\"id\":\"table_regions\",\"title\":\"区域比较：同等研究，分条件决定投入\",\"queryId\":\"regions\",\"columns\":[{\"field\":\"地区\",\"label\":\"地区\",\"link\":false},{\"field\":\"机会依据\",\"label\":\"机会依据\",\"link\":false},{\"field\":\"主要门槛\",\"label\":\"主要门槛\",\"link\":false},{\"field\":\"建议次序\",\"label\":\"建议次序\",\"link\":false}]}]},{\"id\":\"competitors\",\"title\":\"竞品分层：先看便携配件，再看扩展参照\",\"body\":\"## 06｜便携配件优先，整椅保留为扩展参照\\n\\n**按购买任务分三层：** 第一层是与对应终端任务接近的便携配件；第二层是普通腰撑、现有手表功能、改变鼠标等低复杂度替代；第三层是智能整椅和跨品类自动化产品。分类需要结合具体终端，不能给所有五类用同一张整椅排行榜。\\n\\n腰背比较中，先看普通腰撑、米家和Snailax等可加装方案。HBADA、LiberNovo、Backrobo和恒林用于研究主动支撑及整椅交付，不据此确定我们必须做成什么结构。\\n\\n“五类竞品”视图补齐相同字段的专项对照；下表是保留的腰背和整椅扩展资料，顺序已调整。品牌声明、页面价格及型号冲突仍按原核查口径保留，不代表完成实物体验。\\n\\n朋友提到的YOTOK仍待匹配具体商品；云望RheoFit A1作为减少操作负担的跨品类案例。其公开产品页可查，市场效果不能替代本项目验证。\",\"queryId\":\"evidence_competitors\",\"blocks\":[{\"kind\":\"gallery\",\"id\":\"competitor_photos\",\"items\":[{\"asset\":\"hbada\",\"title\":\"HBADA X7\",\"caption\":\"主动跟随整椅；官方产品图\",\"source\":\"S12\"},{\"asset\":\"libernovo\",\"title\":\"LiberNovo Omni Gen\",\"caption\":\"动态整椅；官方活动产品图\",\"source\":\"S13\"},{\"asset\":\"osim\",\"title\":\"OSIM 两件组合\",\"caption\":\"背部＋腿部；官方活动图\",\"source\":\"S17\"}],\"queryId\":\"image_competitor_photos\"},{\"kind\":\"table\",\"id\":\"table_core_competitors\",\"title\":\"腰背扩展参照：便携配件在前，整椅在后\",\"queryId\":\"core_competitors\",\"columns\":[{\"field\":\"顺序\",\"label\":\"顺序\",\"link\":false},{\"field\":\"产品／场景\",\"label\":\"产品／场景\",\"link\":false},{\"field\":\"页面价与口径\",\"label\":\"页面价与口径\",\"link\":false},{\"field\":\"强项\",\"label\":\"强项\",\"link\":false},{\"field\":\"对我们的启示\",\"label\":\"对我们的启示\",\"link\":false},{\"field\":\"官网／来源\",\"label\":\"官网／来源\",\"link\":true}]}]},{\"id\":\"portfolio\",\"title\":\"五类逐项分析，组合价值另行验证\",\"body\":\"## 07｜每类先说明独立价值，再比较组合\\n\\n**首发次序尚未确定。** 五型范围按BP保留，首发次序需要结合最新版图、用户任务、工程准备和成本由团队确认。\\n\\n手触摸式比较指触／手持引导及已有设备；佩戴式比较可接受的提醒；鼠托比较支撑与输入操作；靠背比较沿用现有椅的支撑；舒颈贴比较贴合与温热。每类都有现成替代，不能用终端数量推导组合优势。\\n\\n组合研究可比较两个已经独立成立的终端与共享流程，观察是否减少配置和无效提醒。这是建议的方法，并未确定哪两类先组合。基础控制和安全操作按BP保持免费，可选服务需要独立的持续价值。\\n\\nCOMFIER、SKG、Breo的既有页面冲突仍保留；不得据宣传直接确定机制、接口和BOM。\",\"queryId\":\"evidence_portfolio\",\"blocks\":[{\"kind\":\"table\",\"id\":\"table_extension_competitors\",\"title\":\"其余四型与跨形态参照\",\"queryId\":\"extension_competitors\",\"columns\":[{\"field\":\"BP触点\",\"label\":\"BP触点\",\"link\":false},{\"field\":\"对标对象\",\"label\":\"对标对象\",\"link\":false},{\"field\":\"价格／渠道\",\"label\":\"价格／渠道\",\"link\":false},{\"field\":\"已核实交互或形态\",\"label\":\"已核实交互或形态\",\"link\":false},{\"field\":\"我们必须证明的增量\",\"label\":\"我们必须证明的增量\",\"link\":false},{\"field\":\"链接\",\"label\":\"链接\",\"link\":true}]}]},{\"id\":\"user_research\",\"title\":\"用户真正关心的常是贴合、操作与打扰\",\"body\":\"## 08｜公开用户反馈与待验证需求\\n\\n除了厂家规格，本次还查看了[DeltaHub](https://deltahub.io/products/carpio-ergonomic-wrist-rest)与[Breo](https://us.breo.com/products/n1-pro-neck-massager)自有站可见用户评价。采用少量正反例生成设计问题，不把它们当作代表性消费者调查。\\n\\n**最值得优先测试的四个需求假设：** ①实际接触舒适且位置稳定；②不妨碍工作输入；③使用和维护步骤少；④价值与价格预期一致。它们比“App模式更多”更接近每天会不会使用的决定因素。\\n\\n**尚未完成的一手调研：** 中国、美国及欧洲用户访谈；对实物样机的工作任务测试；支付与退货观察。当前没有自有样机数据、成交记录或可推算购买率的样本，报告中后续样本与阈值均是建议。\",\"queryId\":\"evidence_user_research\",\"blocks\":[{\"kind\":\"table\",\"id\":\"table_voice_of_customer\",\"title\":\"公开评论观察：用于生成验证题，不计算发生率\",\"queryId\":\"voice_of_customer\",\"columns\":[{\"field\":\"观察来源\",\"label\":\"观察来源\",\"link\":false},{\"field\":\"可见反馈的转述\",\"label\":\"可见反馈的转述\",\"link\":false},{\"field\":\"转化成我们的验证项\",\"label\":\"转化成我们的验证项\",\"link\":false}]}]},{\"id\":\"positioning\",\"title\":\"定位讨论：人群、场景和购买理由分别确认\",\"body\":\"## 09｜定位草案与需要团队确认的部分\\n\\n**定位草案：** 面向有具体办公舒适与短时放松需求的人群，提供可按需选择的便携配件，以支撑、输入接触、提醒、节律引导与温热等方式改善使用体验。这里的人群与价值表达仍需要用户研究和团队复核。\\n\\n**已经明确：** 产品形态是便携配件；BP规划五类终端。**尚未明确：** 哪一类先发、是否先做套装、最终支持哪些场景和体型，以及每个配置的售价。\\n\\n按每类先问三件事：用户最近怎样处理问题；现有方案为什么不够；增加我们的设备要付出什么钱和操作。对支撑、按摩、提醒和呼吸引导分别提问，不把它们合成一个模糊的健康需求。\\n\\n中国与海外按同样的问题采集证据；当地预算、服务与使用习惯单独记录。BP的1499元平均硬件客单不能写成五型全套售价。\",\"queryId\":\"evidence_positioning\",\"blocks\":[{\"kind\":\"table\",\"id\":\"table_positioning_options\",\"title\":\"定位方案排序与取舍\",\"queryId\":\"positioning_options\",\"columns\":[{\"field\":\"排名\",\"label\":\"排名\",\"link\":false},{\"field\":\"定位方向\",\"label\":\"定位方向\",\"link\":false},{\"field\":\"有利点\",\"label\":\"有利点\",\"link\":false},{\"field\":\"代价／否决条件\",\"label\":\"代价／否决条件\",\"link\":false},{\"field\":\"结论\",\"label\":\"结论\",\"link\":false}]}]},{\"id\":\"advantages\",\"title\":\"优势与短板：工程、用户证据比“AI”二字更关键\",\"body\":\"## 10｜我们的优势、劣势与壁垒\\n\\n**已确认的是路线与系统设计边界。** BP给出了五型、云端决策/App权限与手动入口、端侧保护的职责划分。这使需求讨论较清楚，但它是设计准备程度，不等于已交付产品、独有技术或商业护城河。\\n\\n**针对靠背的候选优势：** 现有椅适配＋可感知的主动支撑＋低打扰协同。如果三者同时成立，产品可以在低价按摩靠垫与昂贵整椅之间找到清楚位置；如果只成立其中一项，溢价或复购理由会明显减弱。\\n\\n**主要证据缺口与经营挑战，按优先级：** ①本次未收到样机、兼容和安全测试证据；②成本、退货与获客仍是模型；③五型扩展会增加供应、维护和用户教育负担；④品牌、渠道和售后准备程度需要核实；⑤本次未取得持续服务付费证据。资料缺口不等于团队没有开展工作。\\n\\n[奥佳华披露](https://static.cninfo.com.cn/finalpage/2026-04-29/1225247859.PDF)和[HBADA产品](https://hbada.com/products/hbada-x7-smart-ergonomic-chair)说明成熟企业已进入智能控制叙事。我们的壁垒应逐步建立在可复现的接触工程、适配数据库、可靠交付和真实使用证据上。现阶段不声称独占专利、医学效果领先或难以复制的数据网络。\\n\\n**五类共同的研究顺序：** 先验证便携与使用负担，再比较每类具体体验，最后判断组合是否有额外价值。手触、佩戴、鼠托与舒颈不能照搬靠背的优势表达。\",\"queryId\":\"evidence_advantages\",\"blocks\":[{\"kind\":\"table\",\"id\":\"table_moats\",\"title\":\"潜在优势必须用对应证据兑现\",\"queryId\":\"moats\",\"columns\":[{\"field\":\"优先级\",\"label\":\"优先级\",\"link\":false},{\"field\":\"优势假设\",\"label\":\"优势假设\",\"link\":false},{\"field\":\"为什么可能成立\",\"label\":\"为什么可能成立\",\"link\":false},{\"field\":\"当前状态／主要短板\",\"label\":\"当前状态／主要短板\",\"link\":false},{\"field\":\"需要补的证据\",\"label\":\"需要补的证据\",\"link\":false}]}]},{\"id\":\"engineering\",\"title\":\"把定位写进工程验收，再画PCB\",\"body\":\"## 11｜产品与技术落地路线\\n\\n业务上要验证两件不同的事：**硬件本身是否好用；协同是否增加价值。** 第一件不成立，模型与App无法补救；第一件成立而第二件不成立，仍可保留有价值的独立SKU，并继续验证其他终端。\\n\\nBP架构保持不变：云端智能层解释状态和产生受限计划；App展示、授权与手动操作；设备检查能力、时效和约束并执行。本地安全停止、手动接管优先于自动计划；断网仍保留基础手动使用。自动计划不应直接把生成文本当电机指令。\\n\\n**PCB开始前的冻结清单：** 电机及驱动类型、额定/峰值/堵转电流、供电路线、独立保护链、压力传感接口、位置或状态反馈、通信方式、尺寸与线束。以上目前未定，不能从竞品的“AI”“8D”“无线”文案反推我们的BOM。\\n\\n**软件验证顺序建议：** 定时/阈值规则作为基线 → 个体校准 → 多信号质量门控 → 受限计划与反馈 → 只有在对照中增加价值时再提升模型复杂度。仅采集实现功能所需数据，原始波形默认不上云；训练授权与运行、自动执行授权分开。\",\"queryId\":\"evidence_engineering\",\"blocks\":[{\"kind\":\"table\",\"id\":\"table_engineering\",\"title\":\"产品承诺如何转成可验收工程参数\",\"queryId\":\"engineering\",\"columns\":[{\"field\":\"价值目标\",\"label\":\"价值目标\",\"link\":false},{\"field\":\"必须定义的参数\",\"label\":\"必须定义的参数\",\"link\":false},{\"field\":\"验证方式\",\"label\":\"验证方式\",\"link\":false},{\"field\":\"当前状态\",\"label\":\"当前状态\",\"link\":false}]}]},{\"id\":\"business\",\"title\":\"商业难点在获客与交付，而不只是市场增长\",\"body\":\"## 12｜行业商业模式与竞争强度\\n\\n**竞争强度排序（研究判断）：** ①通用按摩硬件与流量竞争强；②工位舒适替代品多、换用成本低；③品牌、售后和体验证明要求高；④电子零部件可采购，但机构、接触和标定一致性形成实际交付难度。供应商报价与产能尚未取得，因此不对供应商议价能力给虚假分数。\\n\\n[奥佳华年报](https://static.cninfo.com.cn/finalpage/2026-04-29/1225247859.PDF)提供了中外业务分化的实际案例；[倍轻松年报](https://vip.stock.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12286488)提示销售费用对利润的重要性。不能把成熟企业费用率直接套进创业项目，但BP中180元其他变动成本必须拆开验证，特别是渠道、支付、履约、退货与获客。\\n\\n**商业模式建议：** 硬件贡献先成立；基础控制免费；服务按持续价值自愿付费。B2B订单有规模，但需求、采购验收和员工使用是三件事。首期不建设复杂企业健康数据管理后台，不用个人状态数据作为雇主考核工具。\",\"queryId\":\"evidence_business\",\"blocks\":[{\"kind\":\"table\",\"id\":\"table_listed_business\",\"title\":\"上市公司案例：收入、费用与利润必须分开看\",\"queryId\":\"listed_business\",\"columns\":[{\"field\":\"公司／口径\",\"label\":\"公司／口径\",\"link\":false},{\"field\":\"2025年数据\",\"label\":\"2025年数据\",\"link\":false},{\"field\":\"对项目的含义\",\"label\":\"对项目的含义\",\"link\":false}]},{\"kind\":\"chart\",\"id\":\"chart_ogawa_regions\",\"title\":\"奥佳华主营收入同比（%）\",\"queryId\":\"ogawa_regions\",\"spec\":{\"type\":\"bar\",\"x\":\"地区\",\"y\":\"收入同比(%)\",\"valueDecimals\":2,\"stackable\":false},\"description\":\"仅奥佳华公司主营收入，国内/国外为披露分部；不是中国或全球行业增速。\",\"height\":300}]},{\"id\":\"economics\",\"title\":\"BP模型的核心约束：469元贡献与成本波动\",\"body\":\"## 13｜单位经济、定价空间与资金约束\\n\\n**最容易混淆的三个口径：** 制造口径毛利率43.30%；扣其他变动成本后的硬件贡献率31.29%；扣固定费用后的模型收益。三者不能互换。下方均采用BP已有假设，并另列敏感性情景。\\n\\n在BP第3年8000名购买者的情景下，制造成本每单增加100元，总成本增加80万元，模型收益由94.304万元降至14.304万元；制造和其他变动成本各增加100元，则变为负65.696万元。成本误差可能比订阅带来的改善更大。敏感性图横轴为制造成本（元），纵轴为单客贡献（元），三条线分别表示其他变动成本180、280、380元/单。\\n\\n**订阅不能被当作补贴硬件的确定收入。** 第3年服务贡献19.104万元，仅覆盖固定费的6.37%。199元年价、20%直接成本和1200付费用户年均未验证；注册人数、硬件累计销量和付费用户年不可混用。\\n\\n**国内报价要逐项落地：** 机构与接触材料、电机/驱动、传感、控制与通信、电源/电池、线束、外壳/织物、装配、标定、测试、包装、良率、保修。850元并不是已经取得的电机版BOM报价。\\n\\n**海外贡献按地区重算：** 不含代收税款的净销售收入－制造－干线/关税－仓储配送－支付/渠道－退货整备与保修－实际获客。对已包含在BP 180元里的项应替换或拆分，不能再扣一遍。由此得到的贡献为正，也还需覆盖当地固定费用。\\n\\n**现金与融资：** 先算研发、模具/夹具、测试认证、首批备货、应收、售后准备和现金缓冲，再减可用资金。当前没有供应商账期与真实订单，不能从三年利润表推出融资金额或回本时间。\",\"queryId\":\"evidence_economics\",\"blocks\":[{\"kind\":\"table\",\"id\":\"table_unit_model\",\"title\":\"BP单客模型与关键派生值\",\"queryId\":\"unit_model\",\"columns\":[{\"field\":\"项目\",\"label\":\"项目\",\"link\":false},{\"field\":\"数值\",\"label\":\"数值\",\"link\":false},{\"field\":\"口径\",\"label\":\"口径\",\"link\":false}]},{\"kind\":\"chart\",\"id\":\"chart_unit_values\",\"title\":\"BP单客硬件贡献：469元\",\"queryId\":\"unit_values\",\"spec\":{\"type\":\"horizontalBar\",\"x\":\"项目\",\"y\":\"金额\",\"currency\":\"CNY\",\"valueDecimals\":0,\"stackable\":false},\"description\":\"1499＝850＋180＋469，均为BP模型。客单不是五件套售价；贡献未扣固定费用。\",\"height\":340},{\"kind\":\"chart\",\"id\":\"chart_sensitivity\",\"title\":\"成本敏感性（人民币元）\",\"queryId\":\"sensitivity\",\"spec\":{\"type\":\"line\",\"x\":\"制造成本\",\"y\":\"单客贡献\",\"series\":\"其他变动成本\",\"currency\":\"CNY\",\"valueDecimals\":0,\"stackable\":false},\"description\":\"研究情景：售价固定1499元；单客贡献＝1499－横轴制造成本－所选系列其他变动成本。基准850/180对应469元；曲线不是报价或预测。\",\"height\":370},{\"kind\":\"chart\",\"id\":\"chart_bp_profit\",\"title\":\"BP三年模型收益（万元）\",\"queryId\":\"bp_profit\",\"spec\":{\"type\":\"bar\",\"x\":\"年份\",\"y\":\"模型收益（万元）\",\"valueDecimals\":3,\"stackable\":false},\"description\":\"收入减制造、其他变动、服务直接成本与固定费。不是净利润、现金流或公司经营预测。三年合计－12.524万元。\",\"height\":340}]},{\"id\":\"go_to_market\",\"title\":\"商业验证：中国与海外用同一方法，各算各的账\",\"body\":\"## 14｜定价、渠道与进入顺序\\n\\n**资源优先级：** 先投入会改变产品决策的工程和用户证据；再投入增长。国内与海外研究采用同一套问题、同一类工作任务和一致指标；商业条件按国家分开记录。\\n\\n价格实验先冻结“买到什么”，再比较价格。测试网格围绕BP客单假设及当地替代品设置，仅是寻找需求边界的工具。第一阶段可展示明确标注“概念测试、暂不可购买”的页面，测理解与意愿；只有产品可交付、退款条件清楚后才验证真实支付。\\n\\n**每个渠道记录：** 合格去重访问、明确了解配置、下单、支付、按时交付、适配成功、实际使用、退款、售后成本。最终看退货后单客贡献，不能只优化点赞、问卷意向或毛订单。\\n\\n**B2B应单列账：** 使用者自愿加入，企业采购承担预算与验收。先研究采购周期、安装/清洁/换人校准和售后责任；只向企业反馈约定的非个人化项目运营信息。不存在已验证的生产率或缺勤改善数据时，不把它们作为ROI销售承诺。\\n\\n**放量顺序由实测改变：** 国内有更高交付效率但弱价格空间时，继续测试海外；海外价格更高但退货/履约侵蚀贡献时，国内先交付。若两边都不能在同一基础配置上产生正贡献，先修改产品范围内的工程方案或暂停该SKU商业化，不用服务收入补齐未经验证的缺口。\",\"queryId\":\"evidence_go_to_market\",\"blocks\":[{\"kind\":\"table\",\"id\":\"table_price_tests\",\"title\":\"候选价格实验：仅用于验证，不是最终报价\",\"queryId\":\"price_tests\",\"columns\":[{\"field\":\"地区\",\"label\":\"地区\",\"link\":false},{\"field\":\"建议测试价\",\"label\":\"建议测试价\",\"link\":false},{\"field\":\"必须固定的条件\",\"label\":\"必须固定的条件\",\"link\":false},{\"field\":\"判定指标\",\"label\":\"判定指标\",\"link\":false}]},{\"kind\":\"table\",\"id\":\"table_channels\",\"title\":\"渠道顺序与验证逻辑\",\"queryId\":\"channels\",\"columns\":[{\"field\":\"次序\",\"label\":\"次序\",\"link\":false},{\"field\":\"方式\",\"label\":\"方式\",\"link\":false},{\"field\":\"适合解决的问题\",\"label\":\"适合解决的问题\",\"link\":false},{\"field\":\"通过条件／不利点\",\"label\":\"通过条件／不利点\",\"link\":false}]}]},{\"id\":\"validation\",\"title\":\"用对照、留存与贡献决定是否继续\",\"body\":\"## 15｜用户研究、产品验证与复盘机制\\n\\n**研究优先级：** 第一，逐类确认用户要完成的任务和现有替代；第二，判断对应单品是否改善使用体验；第三，比较感知、自动化或提醒相对简单方案的增量；第四，验证多终端组合是否值得额外成本；第五，验证可选服务的持续付费。对靠背，可进一步拆成机械支撑、手动调节、自动调节三步；其他终端使用各自的比较任务。\\n\\n中外采用相同的访谈提纲和任务；招募语言、税费、椅型与退货条件按地区处理。不能仅用熟人、团队成员或已经喜欢产品的人。记录拒绝、退出与无效果，避免只呈现正面用户。\\n\\n**每轮复盘模板：** 假设 → 样本与配置 → 事先定义的指标 → 结果和不确定性 → 失败原因 → 继续/修改/停止 → 责任人与下一检查点。需要另列“产品未成熟”和“需求不存在”，避免凭一次粗糙样机就否定市场，或用市场很大掩盖样机失败。\\n\\n所有人体体验须在相应工程安全评估通过之后开展；测试中可以随时停止。统计效能、重复测量与缺失数据处理需要在正式研究前确认。本报告给的是可执行的探索计划，未声称这些样本足以证明健康效果。\",\"queryId\":\"evidence_validation\",\"blocks\":[{\"kind\":\"table\",\"id\":\"table_validation\",\"title\":\"建议验证方案：先确认单品，再验证协同\",\"queryId\":\"validation\",\"columns\":[{\"field\":\"阶段\",\"label\":\"阶段\",\"link\":false},{\"field\":\"建议样本／设计\",\"label\":\"建议样本／设计\",\"link\":false},{\"field\":\"记录的结果\",\"label\":\"记录的结果\",\"link\":false},{\"field\":\"继续／停止条件\",\"label\":\"继续／停止条件\",\"link\":false}]},{\"kind\":\"table\",\"id\":\"table_proposed_gates\",\"title\":\"内部候选门槛：用于讨论和预注册，不是既定产品指标\",\"queryId\":\"proposed_gates\",\"columns\":[{\"field\":\"维度\",\"label\":\"维度\",\"link\":false},{\"field\":\"候选门槛\",\"label\":\"候选门槛\",\"link\":false},{\"field\":\"定义与限制\",\"label\":\"定义与限制\",\"link\":false}]}]},{\"id\":\"risks\",\"title\":\"先控制人体接触和交付风险，再谈规模\",\"body\":\"## 16｜安全、数据与跨境经营风险\\n\\n最应提前花钱的是人体接触、机械约束与故障释放。**“断电停止”与“卸除对人体的作用力”是不同验收项。** 自锁传动不能代替机械卸载设计；软件、云端和App也不能代替独立保护链。\\n\\n[中国国家标准信息](https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=5B5C9F6A22637898C02AD0C9B443C22D)、[FDA一般健康指南](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/general-wellness-policy-low-risk-devices)与[欧盟产品合规说明](https://europa.eu/youreurope/business/product-rules-compliance/general-product-compliance/index_en.htm)可用于建立分类和检测任务。五型并非同一个器具，应在电源、无线、温热、接触与销售宣称确定后逐一核定。\\n\\n数据方面，BP的原始波形默认不上云、训练授权单列是合理方向，但仍需落实到字段、用途、保留期限、删除和访问控制。商业合作方或雇主并不因采购设备就自动取得员工个人状态数据。\",\"queryId\":\"evidence_risks\",\"blocks\":[{\"kind\":\"table\",\"id\":\"table_compliance\",\"title\":\"中国、美国、欧盟：按最终SKU和实际数据处理确认\",\"queryId\":\"compliance\",\"columns\":[{\"field\":\"地区\",\"label\":\"地区\",\"link\":false},{\"field\":\"需要落地的工作\",\"label\":\"需要落地的工作\",\"link\":false},{\"field\":\"当前依据／不能偷换的结论\",\"label\":\"当前依据／不能偷换的结论\",\"link\":false}]},{\"kind\":\"table\",\"id\":\"table_risks\",\"title\":\"风险排序：按潜在影响及当前证据缺口判断\",\"queryId\":\"risks\",\"columns\":[{\"field\":\"排序\",\"label\":\"排序\",\"link\":false},{\"field\":\"风险\",\"label\":\"风险\",\"link\":false},{\"field\":\"当前依据\",\"label\":\"当前依据\",\"link\":false},{\"field\":\"降低风险的动作\",\"label\":\"降低风险的动作\",\"link\":false}]}]},{\"id\":\"conclusion\",\"title\":\"研究结论与待验证事项\",\"body\":\"## 17｜先完成能与伙伴讨论的研究\\n\\n**工作优先级：** ①写清项目理解与信息层级；②五类用同一字段查竞品；③列候选差异、代价和反例；④请团队确认首发与版本；⑤按具体任务配合工具学习。\\n\\n**对优势的排序建议：** 优先检验便携配件能否方便使用，其次看每类的具体体验增益，再看组合是否减少操作。这个顺序是研究建议，不是首发产品排序。当前没有足够证据宣布本项目在这些方面已领先。\\n\\n**讨论时应能回答：** 为什么这个对象可比；价格对应哪个地区和版本；信息来自官网、历史文章还是用户评论；什么证据会改变我们的判断。无法确认的内容明确留空，不从电商评论量推断销售收入。\\n\\n本报告保留行业、技术、法规与财务底稿，供后续查证。下一步决策应使用最新版功能定义和团队确认事项，不用旧版建议覆盖新要求。\",\"queryId\":\"evidence_conclusion\",\"blocks\":[{\"kind\":\"table\",\"id\":\"table_actions\",\"title\":\"按决策价值排序的下一步工作包\",\"queryId\":\"actions\",\"columns\":[{\"field\":\"次序\",\"label\":\"次序\",\"link\":false},{\"field\":\"交付物\",\"label\":\"交付物\",\"link\":false},{\"field\":\"建议责任角色\",\"label\":\"建议责任角色\",\"link\":false},{\"field\":\"通过后做什么\",\"label\":\"通过后做什么\",\"link\":false}]}]},{\"id\":\"method\",\"title\":\"研究口径、来源层级与缺口\",\"body\":\"## 18｜研究方法与使用边界\\n\\n**覆盖：** 中国与海外同等分析；海外细分美国、欧盟、日本和东南亚。行业研究列入16项扩展参照，五类专项研究列入15条背景对照，二者有重叠，不相加计数；另核对欧日地区价格、米家另一SKU和上市公司经营案例。资料登记57项，包括用户BP、机构数据、论文、年报、品牌产品页、法规与媒体报道。资料核查日期为2026年11月5日至6日；各数据的实际时期另列，不能统称2026年实绩。\\n\\n**证据层级：** 机构统计和法规用于人口/规则背景；原始论文和系统综述用于界定已有研究；年报用于公司经营案例；官网用于核对品牌公开售卖与宣称；媒体用于米家新品价格事件；少量自有站评论只用于发现待验证问题。官网不是独立测试，单项积极论文不是总体科学定论。\\n\\n**价格规则：** 保留原币种与地区，不用未核实汇率制造价差优势；记录所选型号、组合与历史活动。价格一般不含所有地区税费、配送和退货成本。SKU混淆、页面自相矛盾和未核实信息均直接标明，不能拿最低变体价格对比最高配置。\\n\\n**事实、规划与判断分开：** 数字图中的BLS、年报属于外部数据；BP单位经济与三年模型属于项目假设；成本敏感性属于算术情景；用户样本、门槛、价格测试与进入顺序属于研究建议。报告没有用户访谈、样机试验、实物拆机、完整专利自由实施分析或渠道投放实测；已开展相关技术关键词初筛，也未联系竞品或客户。\\n\\n**仍缺的关键证据：** 真实BOM与机构样机、接触力/温度等工程限值、适配范围、中外真实支付与退货、持续使用、协同增益、团队能力的可核实交付及自由实施专利分析。商业市场摘要未取得完整方法；GPSR正文访问受限仅列索引初筛。以上缺口决定本报告适合立项和验证设计，不能独立支持量产投资或疗效宣称。\\n\\n**项目资料边界：** 团队沟通用于澄清产品范围。新资料包含历史版本与电商线索，已逐条标注。国内与海外同等比较，不意味着资料完备度相同；未匹配SKU或未取得现价的条目保留缺口。\",\"queryId\":\"evidence_method\",\"blocks\":[]},{\"id\":\"deeper_competition\",\"title\":\"19｜主动整椅技术参照\",\"body\":\"## 19｜整椅用于学习主动支撑，便携配件仍是主要研究对象\\n\\n16项主要对照中包含以下两项主动支撑技术参照。[Backrobo官网](https://www.backrobo.com/)展示通过气室适应坐姿的整椅；[恒林官方开发者页面](https://apps.apple.com/cn/app/%E6%81%92%E6%9E%97%E6%99%BA%E5%AE%B6/id6761041270)描述S800的智能追腰、加热、通风、报告与提醒。它们说明主动适配与软件管理已有竞争表达，不能据“有传感器、有App”推导独特性。\\n\\n**阶段也要分清。** 恒林在[2026年4月活动记录](https://pdf.dfcfw.com/pdf/H22_AN202604301821852218_1.pdf)中将S800描述为推广与品牌展示阶段；如今App可见，只能增加“软件入口已公开”的证据，不能据此证明量产销量或独立效果。把阶段不同的产品都当作成熟爆款，会误判竞争强度。\\n\\n**技术路线保持BP。** Backrobo的气动执行是学习参照；本项目仍按电机与自锁推进。比较应看相同工作任务下的舒适、稳定、声响、操作和故障退出，不预设电机一定优于气囊，或反过来。\\n\\n**靠背专项研究问题：** 在可明确支持的椅型上，外挂方案能否获得足够好的主动支撑，同时降低整椅更换的负担？若安装增加厚度、影响座深或让用户频繁调整，形态差异就未必构成优势。\\n\\n**比较范围：** 本章只作为技术及预算替代参照，不据此把整椅设为五类产品共同的第一竞争圈。\",\"queryId\":\"v2_evidence_deeper_competition\",\"blocks\":[{\"kind\":\"table\",\"id\":\"table_v2_new_competitors\",\"title\":\"新增必须跟踪的主动支撑产品\",\"queryId\":\"v2_new_competitors\",\"columns\":[{\"field\":\"对象\",\"label\":\"对象\",\"link\":false},{\"field\":\"已核实的公开信息\",\"label\":\"已核实的公开信息\",\"link\":false},{\"field\":\"投资含义\",\"label\":\"投资含义\",\"link\":false},{\"field\":\"仍需核实\",\"label\":\"仍需核实\",\"link\":false},{\"field\":\"来源\",\"label\":\"来源\",\"link\":true}]}]},{\"id\":\"deeper_ip\",\"title\":\"20｜技术差异与专利初筛\",\"body\":\"## 20｜“压力感知＋电动调节”需要进一步拆成可保护、可实施的方案\\n\\n[CN113349586B](https://patents.google.com/patent/CN113349586B/zh)公开文本的权利要求包含压力传感、电动推杆及特定调节方法；[US20240188719A1](https://patents.google.com/patent/US20240188719A1/en)则涉及气囊随背支撑和压力检测等内容。二者只能证明相关公开技术存在，不能直接证明我们的方案侵权、可自由实施，或没有新颖空间。\\n\\n**建议把壁垒讨论从名词改成证据：** 固定与接触结构是否适配目标椅型；信号在体型、面料和动作变化下是否可靠；局部保护与机械卸载是否可重复；校准和动作能否减少打扰；软件协同是否比简单规则增加收益。每一项都对应测试与工程实现，才可能形成可解释差异。\\n\\n**下一步的具体交付物：** 最终候选机构图与控制流程 → 按中国、美国等目标市场查专利家族和官方法律状态 → 逐项比对独立权利要求 → 形成许可、调整设计或继续评估的建议。正式自由实施分析需要基于具体方案开展，不在市场报告里替代完成。\",\"queryId\":\"v2_evidence_deeper_ip\",\"blocks\":[{\"kind\":\"table\",\"id\":\"table_v2_patents\",\"title\":\"相关技术初筛：看权利要求，而不是只看标题\",\"queryId\":\"v2_patents\",\"columns\":[{\"field\":\"公开文献\",\"label\":\"公开文献\",\"link\":false},{\"field\":\"与BP的相邻点\",\"label\":\"与BP的相邻点\",\"link\":false},{\"field\":\"关键区别／审查任务\",\"label\":\"关键区别／审查任务\",\"link\":false},{\"field\":\"来源\",\"label\":\"来源\",\"link\":true}]}]},{\"id\":\"deeper_channels\",\"title\":\"21｜海外售价、渠道与退货后的真实贡献\",\"body\":\"## 21｜海外高售价需要同时承担渠道和服务成本\\n\\n按[Amazon美国官方收费表](https://sell.amazon.com/pricing)，家具类总售价前200美元按15%、超过部分按10%计算；Home and Kitchen与Office Products为15%。平台同时说明，收费类别未必等同消费者看到的展示分类。下例只是说明费用数量级，不能据此替产品确定类目。\\n\\n**299美元不是299美元可支配毛利。** 两种示例类别仅佣金就分别占39.90和44.85美元；还要计入制造、干线、仓配、获客、退换和固定投入。美国美元表与BP人民币表分别计算，不用未经核实的汇率把二者拼接。\\n\\n**退货承诺也是产品竞争。** [LiberNovo美国直购条款](https://libernovo.com/policies/refund-policy)与[Backrobo条款](https://www.backrobo.com/pages/warranty)对费用、包装和部件的规定不同。我们应先确定可承担的服务方案，再测转化与退款；不能宣传完整试用承诺，却只在成本表中列出发货运费。\\n\\n**国内也采用同一检查方式。** 将BP180元其他变动成本拆到具体渠道、支付、出库配送、获客、退货整备与保修，逐项标注报价、实际记录或假设；已包含的费用不再重复扣减。中外各用完整单客贡献和现金占用决定投放规模。\",\"queryId\":\"v2_evidence_deeper_channels\",\"blocks\":[{\"kind\":\"table\",\"id\":\"table_v2_channel_fees\",\"title\":\"美国299美元总售价的佣金示例\",\"queryId\":\"v2_channel_fees\",\"columns\":[{\"field\":\"假设收费类目\",\"label\":\"假设收费类目\",\"link\":false},{\"field\":\"佣金计算\",\"label\":\"佣金计算\",\"link\":false},{\"field\":\"佣金USD\",\"label\":\"佣金USD\",\"link\":false},{\"field\":\"扣佣金后USD\",\"label\":\"扣佣金后USD\",\"link\":false}]},{\"kind\":\"table\",\"id\":\"table_v2_service_terms\",\"title\":\"服务条款必须落到部件、渠道和费用\",\"queryId\":\"v2_service_terms\",\"columns\":[{\"field\":\"品牌\",\"label\":\"品牌\",\"link\":false},{\"field\":\"页面承诺与条件\",\"label\":\"页面承诺与条件\",\"link\":false},{\"field\":\"我们的决策影响\",\"label\":\"我们的决策影响\",\"link\":false},{\"field\":\"来源\",\"label\":\"来源\",\"link\":true}]}]},{\"id\":\"deeper_demand\",\"title\":\"22｜支付信号、融资叙事与下一阶段资金用途\",\"body\":\"## 22｜有邻近产品的支付信号，还需要我们自己的购买证据\\n\\n[LiberNovo Omni众筹项目](https://www.kickstarter.com/projects/libernovo/libernovo-omni-worlds-first-dynamic-ergonomic-chair)记录了2025年6月至8月的单一活动：11,620名支持者承诺约7,997万港元。这比纯浏览量更接近资金承诺，但不是经审计收入、完成交付的销量、利润或本项目转化率。不同品牌、价格、配置、推广与服务条件也无法直接套用。\\n\\n**对投资人更可复核的说法：** 相邻动态整椅已出现付费参与案例；国内制造企业也在布局；我们的机会假设是以现有椅附件提供足够好的工作支撑与低打扰协同。这个假设需要用兼容、对照使用、真实支付和退款后贡献证明。\\n\\n**建议资金按证据分阶段投入：** 第一阶段支持机构、接触、保护与标定样机；第二阶段支持同任务对照、小批试用和售后记录；第三阶段才根据独立SKU与组合增益扩展终端。每阶段明确交付物、验收负责人、可调整和停止条件。当前缺少模具、认证、首批备货和账期报价，融资额与估值仍待核算，不按模型亏损直接填一个数字。\\n\\n**投资人／伙伴讨论清单：** 首个可交付配置是什么；椅型支持边界是什么；哪项对照证明自动化值得保留；完整成本由谁核实；相关专利如何处理；下一阶段资金会换来哪份可验收证据。六个问题都能追溯到文件，比堆叠功能和行业规模更有用。\",\"queryId\":\"v2_evidence_deeper_demand\",\"blocks\":[]},{\"id\":\"sources_foundation\",\"title\":\"附录A｜BP、需求与行业资料\",\"body\":\"## 附录A｜BP、需求与行业资料\\n\\n- **S01** [S01 · 用户BP]｜用户材料｜2026-10。五类终端、主动靠背路线和财务假设；用户明确以BP为准。概念图不是样机，经营模型不是实际业绩。\\n\\n- **S02** [WHO：Low back pain](https://www.who.int/news-room/fact-sheets/detail/low-back-pain)｜公共机构｜2023-06-19。2020年全球下背痛估计6.19亿人；不是办公人群、购买人口或本产品疗效。\\n\\n- **S03** [Cochrane：工作间歇干预综述](https://www.cochrane.org/evidence/CD012886_work-break-interventions-preventing-musculoskeletal-symptoms-and-disorders-healthy-workers)｜系统综述｜2025-10。9项研究、626人，证据搜索截至2024年5月；总体确定性很低。\\n\\n- **S04** [SJWEH：主动间歇与姿势变化随机试验](https://www.sjweh.fi/show_abstract.php?abstract_id=3949)｜同行评审研究｜2021。曼谷6家机构193人，6个月随访；特定干预有积极结果，不能外推为千里复序疗效。\\n\\n- **S05** [国家统计局：2025年统计公报](https://www.stats.gov.cn/sj/zxfb/202602/t20260228_1962662.html)｜公共机构｜2026-02-28。2025年末城镇就业4.7535亿人；包括大量非桌面岗位，不是项目TAM。\\n\\n- **S06** [美国BLS：2025年远程工作与职业](https://www.bls.gov/cps/cpsaat60.htm)｜公共机构｜2026-02-20。2025年年度估计为剔除10月的11个月平均。全部在岗人员22.4%曾在参考周远程工作；计算机与数学职业65.4%。\\n\\n- **S07** [Eurofound：混合办公政策简报](https://www.eurofound.europa.eu/en/publications/all/hybrid-workplace-ensuring-benefits-for-workers-and-organisations)｜公共机构｜2025-11-11。基于EWCS 2024和组织案例；提示家庭工作站人体工学、休息与工作边界问题。\\n\\n- **S08** [GVR：全球人体工学椅市场](https://www.grandviewresearch.com/industry-analysis/ergonomic-chair-market-report)｜商业研究摘要｜2023—2030口径。2022年98亿美元；2030年约168亿美元预测；只作相邻行业背景，未取得完整方法或报告。\\n\\n- **S09** [GVR：中国人体工学椅市场](https://www.grandviewresearch.com/horizon/outlook/ergonomic-chair-market/china)｜商业研究摘要｜2022—2030口径。2022年8.207亿美元，2030年17.43亿美元预测；非智能外挂靠背市场，公开页存在分类与名单瑕疵。\\n\\n- **S10** [奥佳华：2025年年度报告](https://static.cninfo.com.cn/finalpage/2026-04-29/1225247859.PDF)｜上市公司披露｜2026-04-29。营收50.869亿元；主营国内同比-6.81%、国外+10.30%；年报还披露旗舰产品力检测和闭环控制。公司案例不代表全行业。\\n\\n- **S11** [倍轻松：2025年年度报告（公告镜像）](https://vip.stock.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12286488)｜上市公司披露镜像｜2026-04-30。营收7.790亿元、归母净利润-0.973亿元、销售费用4.127亿元；销售费用率约52.98%，不等同广告费率。\",\"queryId\":\"evidence_sources_foundation\",\"blocks\":[]},{\"id\":\"sources_products\",\"title\":\"附录B｜竞品官网与价格事件\",\"body\":\"## 附录B｜竞品官网与价格事件\\n\\n- **S12** [HBADA X7：美国官网](https://hbada.com/products/hbada-x7-smart-ergonomic-chair)｜品牌官网｜2026-11-05查看。自动腰部跟随、按摩与加热为官方宣称；X7页面选中型号1169美元，999美元是X7 Air，不能混用。\\n\\n- **S13** [LiberNovo Omni Gen：美国官网](https://libernovo.com/products/libernovo-omni-dynamic-ergonomic-chair)｜品牌官网｜2026-11-05查看。Omni Gen整椅页面价1019美元；电动调节、动态支撑、OmniStretch。未据此认定其有BP同构压力闭环。\\n\\n- **S14** [LiberNovo Omni：欧盟官网](https://eu.libernovo.com/products/libernovo-omni-dynamic-ergonomic-chair)｜品牌官网｜2026-11-05查看。页面展示1049欧元；页面合并Omni/Omni Gen选项，具体结算配置需再核实，不与美国SKU机械比价。\\n\\n- **S15** [SIHOO Doro S300：美国官网](https://www.sihoo.com/products/sihoo-doro-s300-gravity-defying-ergonomic-chair)｜品牌官网｜2026-11-05查看。599.99美元；双动态腰托与机械调节整椅。动态支撑不必然意味着电动或传感控制。\\n\\n- **S16** [SIHOO Doro S300：日本官网](https://sihoooffice.co.jp/products/sihoo-s300)｜品牌官网｜2026-11-05查看。S300页面显示107999日元促销价；供日本市场价格及本地销售入口参考。\\n\\n- **S17** [OSIM Invisible Massage Chair：美国官网](https://us.osim.com/products/invisible-massage-chair)｜品牌官网｜2026-11-05查看。1398美元，两件组合为uJolly Sync背部按摩器和uPhoria Sync腿部按摩器。不能把两件组合等同BP五型统一协议。\\n\\n- **S18** [IT之家：米家智能腰背按摩仪开售](https://m.ithome.com/html/1016344.htm)｜媒体报道｜2026-10-22。报道首销599元、建议零售699元；450mm导轨、热敷、米家App。不是11月5日结算价。\\n\\n- **S19** [IT之家：米家智能腰部按摩仪2上架](https://www.ithome.com/1/018/769.htm)｜媒体报道｜2026-10-28。报道建议零售499元、11月4日起众筹379元；腰臀按摩与热敷。与腰背按摩仪是不同SKU。\\n\\n- **S20** [COMFIER：颈背揉捏、气压、热敷靠垫](https://www.comfier.com/collections/back-massager/products/comfier-neck-back-massager-2309)｜品牌官网｜2026-11-05查看。229.99美元；网页标题2307、URL及图片2309，保留型号冲突，采购前核对铭牌。\\n\\n- **S21** [Snailax：SL256按摩靠垫](https://www.snailax.com/products/shiatsu-massage-cushion-with-heat-256)｜品牌官网｜2026-11-05查看。页面价119.99美元；背部游走揉捏、热敷，座部振动。不同选项不能合并成单一配置。\\n\\n- **S22** [COMFIER：CF2206振动靠垫](https://www.comfier.com/collections/back-massager/products/vibration-massage-seat-cushion-2206)｜品牌官网｜2026-11-05查看。黑色选项69.99美元，10个振动电机；其振动功能不等于揉捏或主动腰托。\\n\\n- **S23** [UPRIGHT GO 2：官方产品页](https://www.uprightpose.com/upright-go2/)｜品牌官网｜2026-11-05查看。页面79美元；姿态提醒、振动、免费App。官网健康效果百分比未经本报告独立验证，不采用。\\n\\n- **S24** [DeltaHub Carpio 2.0：官方产品页与可见评论](https://deltahub.io/products/carpio-ergonomic-wrist-rest)｜品牌官网及自有站评论｜2026-11-05查看。单只34.90美元；滑动掌托。可见评论涉及粘手、切换键盘时移位、重新找支撑位置；非随机评价样本。\\n\\n- **S25** [Logitech Lift：美国官网](https://www.logitech.com/en-us/shop/p/lift-vertical-ergonomic-mouse)｜品牌官网｜2026-11-05查看。79.99美元；57°垂直鼠标，面向中小手型并有左手版本；作为输入体验参照，不是鼠托同形态产品。\\n\\n- **S26** [SKG G7 PRO FOLD：官方产品页](https://www.skg.com/products/g7-pro-fold-neck-massager)｜品牌官网｜2026-11-05查看。149.99美元，折叠、温热和App设置。页面同时出现pulse/electrodes和never electrical current，机制待说明书确认。\\n\\n- **S27** [Breo N1 Pro：美国官方页与可见评论](https://us.breo.com/products/n1-pro-neck-massager)｜品牌官网及自有站评论｜2026-11-05查看。99.99美元，颈肩按摩；页面的有线/续航及敲击/揉捏描述互相冲突。可见评论提出固定不稳的问题。\\n\\n- **S28** [HeartMath：emWave2指触传感说明](https://kb.heartmath.com/en/emwave2/using-a-finger-sensor-with-emwave2)｜品牌支持文档｜2026-11-05查看。便携模式使用集成拇指传感器或耳夹；作为指触反馈交互参照，价格和当前主机供货未确认。\",\"queryId\":\"evidence_sources_products\",\"blocks\":[]},{\"id\":\"sources_rules\",\"title\":\"附录C｜安全、监管与数据规则\",\"body\":\"## 附录C｜安全、监管与数据规则\\n\\n- **S29** [国家标准：GB/T 4706.10—2024](https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=5B5C9F6A22637898C02AD0C9B443C22D)｜公共机构｜2026-08-01实施。按摩器具安全特殊要求，官方页标注现行；该页不提供全文，不推断所有五型均属同一认证类别。\\n\\n- **S30** [中华人民共和国个人信息保护法](https://hnca.miit.gov.cn/zwgk/zcwj/flfg/art/2021/art_1ece6b7f16a8415fbe74e61b02a871b9.html)｜法律官方转载｜2021。第28—30条涉及敏感信息与单独同意；跨境提供另有规则。应按具体处理活动确认适用条件。\\n\\n- **S31** [FDA：General Wellness低风险产品指南](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/general-wellness-policy-low-risk-devices)｜监管机构｜2026-01。一般健康用途需要与疾病诊疗宣称及实际风险区分；消费级定位不等同自动获得豁免。\\n\\n- **S32** [FTC：Health Breach Notification Rule说明](https://www.ftc.gov/business-guidance/resources/health-breach-notification-rule-basics-business)｜监管机构｜2024-07。2024年修订明确涉及多数健康App及类似技术；需判断本项目是否属于适用主体。\\n\\n- **S33** [欧盟GDPR原文](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng/pdf)｜法规原文｜2016。第9条将健康数据列为特殊类别，处理需满足相应条件；不因产品非医疗就自动排除。\\n\\n- **S34** [欧盟GPSR官方摘要（正文访问受限）](https://eur-lex.europa.eu/legal-content/en/TXT/?uri=LEGISSUM%3A4670517)｜官方搜索摘要｜2026-11-05检索。官方索引摘要说明欧盟责任主体要求；正文受JavaScript验证限制，仅作初筛，未完成逐条适用性审查。\\n\\n- **S35** [Your Europe：产品合规职责](https://europa.eu/youreurope/business/product-rules-compliance/general-product-compliance/index_en.htm)｜公共机构｜2026-11-05查看。制造商应识别产品适用规则、保留技术文件、完成相应评估与追溯；进入欧盟需按最终硬件配置核定。\",\"queryId\":\"evidence_sources_rules\",\"blocks\":[]},{\"id\":\"sources_v2\",\"title\":\"附录D｜竞争、专利与渠道来源\",\"body\":\"## 附录D｜竞争、专利与渠道来源\\n\\n- **S36** [Backrobo：Air Smart Chair C2官网](https://www.backrobo.com/)｜2026-11-06核查。C2美国页面价1099美元；官网描述通过气室自动适应坐姿，配套App。是气动整椅参照，不能据此改变BP电机自锁路线。\\n\\n- **S37** [Backrobo：保修与退货条款](https://www.backrobo.com/pages/warranty)｜2026-11-06核查。标题为10年有限保修，但附注整椅1年、部分腰部功能组件3年；非质量原因退货由客户承担运费。须按具体部件确认，不能统称整椅10年。\\n\\n- **S38** [LiberNovo Omni：Kickstarter项目结果](https://www.kickstarter.com/projects/libernovo/libernovo-omni-worlds-first-dynamic-ergonomic-chair)｜众筹期2025-06-24—08-23。平台展示11620名支持者、承诺金额79966705港元。是单一项目的众筹记录，不是交付量、年度营收、利润或本项目需求预测。\\n\\n- **S39** [CN113349586B：自适应椅背结构及调节方法](https://patents.google.com/patent/CN113349586B/zh)｜2024-10-25授权公告；2026-11-06查看。权利要求涉及压力传感、电动推杆和特定调节方法。仅作相关技术初筛；Google法律状态不是官方法律结论，未完成有效性或自由实施分析。\\n\\n- **S40** [US20240188719A1：随背支撑装置与控制方法](https://patents.google.com/patent/US20240188719A1/en)｜2024-06-13公开；2026-11-06查看。公开申请涉及气囊、压力检测、控制器与久坐干预；申请人记载为Shanghai Backrobo Wellness。申请公开不等于已授权，需按国家和权利要求核实。\\n\\n- **S41** [Amazon美国：销售计划与佣金表](https://sell.amazon.com/pricing)｜2026-11-06核查。家具类前200美元15%、超过部分10%；Home and Kitchen及Office Products为15%。费率分类未必等同店铺展示类别，另有履约、仓储、广告等费用。\\n\\n- **S42** [LiberNovo美国：退货政策](https://libernovo.com/policies/refund-policy)｜政策更新2026-10-08；2026-11-06查看。符合条件的直购订单30天退货，品牌承担退回运费；原包装、配件及状态有要求，美国补纸箱约29美元；第三方渠道不适用该直购条款。\\n\\n- **S43** [恒林股份：2026年4月投资者关系活动记录](https://pdf.dfcfw.com/pdf/H22_AN202604301821852218_1.pdf)｜2026-04-30。该时点公司称S800主要处于市场推广和品牌展示阶段；不能据此认定2026年11月仍处于相同阶段，也不能把公司整体收入归因于S800。\\n\\n- **S44** [恒林智家：官方开发者App页面](https://apps.apple.com/cn/app/%E6%81%92%E6%9E%97%E6%99%BA%E5%AE%B6/id6761041270)｜2026-11-06核查。开发者为恒林家居股份有限公司；描述S800智能追腰、加热、座垫通风、报告与提醒。功能为开发者宣称，App上架不等于功能独立验证或可推算硬件销量。\",\"queryId\":\"v2_evidence_sources_v2\",\"blocks\":[]},{\"id\":\"sources_v3\",\"title\":\"附录E｜五类专项来源\",\"body\":\"## 附录E｜项目定义与五类专项来源\\n\\n- **S45** 项目范围说明：用户提供的聊天截图｜2026-11-06读取。仅用于确认项目范围与研究方向：便携式配件、五类竞品、定位与优势；产品图仍会更新，首发顺序尚未确定。\\n\\n- **S46** [京东：YOTOK相关腰部支撑靠垫商品线索](https://www.jd.com/brand/9847a3fdb2739a8f18f2.html?electedExtAttrSet=3379%2C&extAttrValue=expand_name%2C%40165509%3A%3A3379&sort_type=sort_redissale_desc)｜2026-11-06读取。可见优藤悠居YOTOK腰撑商品标题；未匹配朋友所发商品的完整型号、规格与成交价。标题中的日本并非品牌归属核验，评论量不能换算销量或收入。\\n\\n- **S47** [云望创新：中国官网产品介绍](https://rheofit.com.cn/)｜2026-11-06读取。RheoFit A1自动滚动按摩产品，介绍运动后及久坐后放松、App、可换按摩套和速度调节；效果与AI能力为品牌宣称。\\n\\n- **S48** [RheoFit A1：美国销售页面](https://rheofit.com/zh-hans/products/rheofita1)｜2026-11-06读取。页面地区明确为美国、币种USD，A1选项显示379美元；简体中文界面不是中国售价。用作跨品类自动化体验案例，不等同办公靠背。\\n\\n- **S49** [Moonbird：手持呼吸引导产品](https://www.moonbird.life/products/moonbird)｜2026-11-06读取。美国页面基础设备加基础App为179.99美元；设备加一年高级App为199.99美元活动价。官网描述光学PPG与触觉起伏引导，可独立使用；未独立验证健康效果。\\n\\n- **S50** [华为：手表及手环呼吸训练说明](https://consumer.huawei.com/cn/support/content/zh-cn00737155/)｜2026-11-06读取。可设置训练时长和节奏，跟随屏幕提示；部分训练限特定设备。作为既有设备的呼吸引导任务替代，不等于指触硬件。\\n\\n- **S51** [华为WATCH FIT/FIT new：功能兼容性表](https://consumer.huawei.com/cn/support/content/zh-cn15935094/)｜2026-11-06读取。对应型号支持呼吸训练和久坐提醒。未核实当前价格和供货，不把所有华为型号配置混用。\\n\\n- **S52** [HiPee智能矫姿精灵：历史说明书镜像](https://myosuploads3.banggood.com/products/20210428/20210428025833hipee-202002041.pdf)｜2021年路径；2026-11-06读取。记录姿态基准、设置角度与延迟、振动提醒及暂停等交互。历史文档不能证明当前在售版本、价格或App可用性。\\n\\n- **S53** [HiPee：一名用户的历史试用记录](https://zhongce.sina.com.cn/iframe/article/view/112534/)｜2021-11-29；2026-11-06读取。作者描述设置方便，同时提及洗碗场景提醒问题及振动强度不可调。仅为旧版个人体验线索，不代表总体故障率或当前版本表现。\\n\\n- **S54** [京东：绿联护腕鼠标垫产品目录](https://www.jd.com/brand/670aec8191e37a9364b.html?catID=826&electedExtAttrSet=&extAttrValue=expand_name%2C&sort_type=sort_redissale_desc)｜2026-11-06读取。显示记忆棉护腕鼠标垫等国内在售线索；未取得稳定单SKU价格，不能把系列评论量或海外规格直接并到国内款。\\n\\n- **S55** [UGREEN India：25245护腕鼠标垫销售页](https://www.ugreenindia.com/products/ugreen-ergonomic-mouse-pad-with-wrist-rest-support-slow-rebound-memory-foam-mouse-mat-pain-relief-typing-desk-mouse-pad-with-easy-glide-surface-and-non-slip-pu-base-for-gaming-and-working-black-25245)｜2026-11-06读取。页面SKU 25245、印度卢比999；用于补充系列线索，不能写成中国价格或认定与国内商品配置相同。\\n\\n- **S56** [IT之家：米家智能肩颈按摩仪开售](https://www.ithome.com/0/822/843.htm)｜2025-01-07；2026-11-06读取。报道首发299元、建议零售399元，揉捏、两挡热敷和米家App。是历史价格事件，不是本次成交价；与颈部按摩仪、颈枕按摩仪分开。\\n\\n- **S57** [成者官网：坐姿佳视觉AI坐姿仪发布记录](https://www.czur.com/detail/22?id=221)｜2021年发布资料；2026-11-06读取。桌面视觉坐姿及久坐提醒，灵敏度与提醒时长可设。文中249/349元为历史基础/旗舰版本价；当前供货与隐私实现待核实。\",\"queryId\":\"v3_evidence_sources\",\"blocks\":[]}],\"sourcePreviews\":{\"https://www.who.int/news-room/fact-sheets/detail/low-back-pain\":{\"title\":\"WHO：Low back pain\",\"summary\":\"2020年全球下背痛估计6.19亿人；不是办公人群、购买人口或本产品疗效。\",\"source\":\"公共机构\",\"date\":\"2023-06-19\",\"approvedForReport\":true},\"https://www.cochrane.org/evidence/CD012886_work-break-interventions-preventing-musculoskeletal-symptoms-and-disorders-healthy-workers\":{\"title\":\"Cochrane：工作间歇干预综述\",\"summary\":\"9项研究、626人，证据搜索截至2024年5月；总体确定性很低。\",\"source\":\"系统综述\",\"date\":\"2025-10\",\"approvedForReport\":true},\"https://www.sjweh.fi/show_abstract.php?abstract_id=3949\":{\"title\":\"SJWEH：主动间歇与姿势变化随机试验\",\"summary\":\"曼谷6家机构193人，6个月随访；特定干预有积极结果，不能外推为千里复序疗效。\",\"source\":\"同行评审研究\",\"date\":\"2021\",\"approvedForReport\":true},\"https://www.stats.gov.cn/sj/zxfb/202602/t20260228_1962662.html\":{\"title\":\"国家统计局：2025年统计公报\",\"summary\":\"2025年末城镇就业4.7535亿人；包括大量非桌面岗位，不是项目TAM。\",\"source\":\"公共机构\",\"date\":\"2026-02-28\",\"approvedForReport\":true},\"https://www.bls.gov/cps/cpsaat60.htm\":{\"title\":\"美国BLS：2025年远程工作与职业\",\"summary\":\"2025年年度估计为剔除10月的11个月平均。全部在岗人员22.4%曾在参考周远程工作；计算机与数学职业65.4%。\",\"source\":\"公共机构\",\"date\":\"2026-02-20\",\"approvedForReport\":true},\"https://www.eurofound.europa.eu/en/publications/all/hybrid-workplace-ensuring-benefits-for-workers-and-organisations\":{\"title\":\"Eurofound：混合办公政策简报\",\"summary\":\"基于EWCS 2024和组织案例；提示家庭工作站人体工学、休息与工作边界问题。\",\"source\":\"公共机构\",\"date\":\"2025-11-11\",\"approvedForReport\":true},\"https://www.grandviewresearch.com/industry-analysis/ergonomic-chair-market-report\":{\"title\":\"GVR：全球人体工学椅市场\",\"summary\":\"2022年98亿美元；2030年约168亿美元预测；只作相邻行业背景，未取得完整方法或报告。\",\"source\":\"商业研究摘要\",\"date\":\"2023—2030口径\",\"approvedForReport\":true},\"https://www.grandviewresearch.com/horizon/outlook/ergonomic-chair-market/china\":{\"title\":\"GVR：中国人体工学椅市场\",\"summary\":\"2022年8.207亿美元，2030年17.43亿美元预测；非智能外挂靠背市场，公开页存在分类与名单瑕疵。\",\"source\":\"商业研究摘要\",\"date\":\"2022—2030口径\",\"approvedForReport\":true},\"https://static.cninfo.com.cn/finalpage/2026-04-29/1225247859.PDF\":{\"title\":\"奥佳华：2025年年度报告\",\"summary\":\"营收50.869亿元；主营国内同比-6.81%、国外+10.30%；年报还披露旗舰产品力检测和闭环控制。公司案例不代表全行业。\",\"source\":\"上市公司披露\",\"date\":\"2026-04-29\",\"approvedForReport\":true},\"https://vip.stock.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12286488\":{\"title\":\"倍轻松：2025年年度报告（公告镜像）\",\"summary\":\"营收7.790亿元、归母净利润-0.973亿元、销售费用4.127亿元；销售费用率约52.98%，不等同广告费率。\",\"source\":\"上市公司披露镜像\",\"date\":\"2026-04-30\",\"approvedForReport\":true},\"https://hbada.com/products/hbada-x7-smart-ergonomic-chair\":{\"title\":\"HBADA X7：美国官网\",\"summary\":\"自动腰部跟随、按摩与加热为官方宣称；X7页面选中型号1169美元，999美元是X7 Air，不能混用。\",\"source\":\"品牌官网\",\"date\":\"2026-11-05查看\",\"approvedForReport\":true},\"https://libernovo.com/products/libernovo-omni-dynamic-ergonomic-chair\":{\"title\":\"LiberNovo Omni Gen：美国官网\",\"summary\":\"Omni Gen整椅页面价1019美元；电动调节、动态支撑、OmniStretch。未据此认定其有BP同构压力闭环。\",\"source\":\"品牌官网\",\"date\":\"2026-11-05查看\",\"approvedForReport\":true},\"https://eu.libernovo.com/products/libernovo-omni-dynamic-ergonomic-chair\":{\"title\":\"LiberNovo Omni：欧盟官网\",\"summary\":\"页面展示1049欧元；页面合并Omni/Omni Gen选项，具体结算配置需再核实，不与美国SKU机械比价。\",\"source\":\"品牌官网\",\"date\":\"2026-11-05查看\",\"approvedForReport\":true},\"https://www.sihoo.com/products/sihoo-doro-s300-gravity-defying-ergonomic-chair\":{\"title\":\"SIHOO Doro S300：美国官网\",\"summary\":\"599.99美元；双动态腰托与机械调节整椅。动态支撑不必然意味着电动或传感控制。\",\"source\":\"品牌官网\",\"date\":\"2026-11-05查看\",\"approvedForReport\":true},\"https://sihoooffice.co.jp/products/sihoo-s300\":{\"title\":\"SIHOO Doro S300：日本官网\",\"summary\":\"S300页面显示107999日元促销价；供日本市场价格及本地销售入口参考。\",\"source\":\"品牌官网\",\"date\":\"2026-11-05查看\",\"approvedForReport\":true},\"https://us.osim.com/products/invisible-massage-chair\":{\"title\":\"OSIM Invisible Massage Chair：美国官网\",\"summary\":\"1398美元，两件组合为uJolly Sync背部按摩器和uPhoria Sync腿部按摩器。不能把两件组合等同BP五型统一协议。\",\"source\":\"品牌官网\",\"date\":\"2026-11-05查看\",\"approvedForReport\":true},\"https://m.ithome.com/html/1016344.htm\":{\"title\":\"IT之家：米家智能腰背按摩仪开售\",\"summary\":\"报道首销599元、建议零售699元；450mm导轨、热敷、米家App。不是11月5日结算价。\",\"source\":\"媒体报道\",\"date\":\"2026-10-22\",\"approvedForReport\":true},\"https://www.ithome.com/1/018/769.htm\":{\"title\":\"IT之家：米家智能腰部按摩仪2上架\",\"summary\":\"报道建议零售499元、11月4日起众筹379元；腰臀按摩与热敷。与腰背按摩仪是不同SKU。\",\"source\":\"媒体报道\",\"date\":\"2026-10-28\",\"approvedForReport\":true},\"https://www.comfier.com/collections/back-massager/products/comfier-neck-back-massager-2309\":{\"title\":\"COMFIER：颈背揉捏、气压、热敷靠垫\",\"summary\":\"229.99美元；网页标题2307、URL及图片2309，保留型号冲突，采购前核对铭牌。\",\"source\":\"品牌官网\",\"date\":\"2026-11-05查看\",\"approvedForReport\":true},\"https://www.snailax.com/products/shiatsu-massage-cushion-with-heat-256\":{\"title\":\"Snailax：SL256按摩靠垫\",\"summary\":\"页面价119.99美元；背部游走揉捏、热敷，座部振动。不同选项不能合并成单一配置。\",\"source\":\"品牌官网\",\"date\":\"2026-11-05查看\",\"approvedForReport\":true},\"https://www.comfier.com/collections/back-massager/products/vibration-massage-seat-cushion-2206\":{\"title\":\"COMFIER：CF2206振动靠垫\",\"summary\":\"黑色选项69.99美元，10个振动电机；其振动功能不等于揉捏或主动腰托。\",\"source\":\"品牌官网\",\"date\":\"2026-11-05查看\",\"approvedForReport\":true},\"https://www.uprightpose.com/upright-go2/\":{\"title\":\"UPRIGHT GO 2：官方产品页\",\"summary\":\"页面79美元；姿态提醒、振动、免费App。官网健康效果百分比未经本报告独立验证，不采用。\",\"source\":\"品牌官网\",\"date\":\"2026-11-05查看\",\"approvedForReport\":true},\"https://deltahub.io/products/carpio-ergonomic-wrist-rest\":{\"title\":\"DeltaHub Carpio 2.0：官方产品页与可见评论\",\"summary\":\"单只34.90美元；滑动掌托。可见评论涉及粘手、切换键盘时移位、重新找支撑位置；非随机评价样本。\",\"source\":\"品牌官网及自有站评论\",\"date\":\"2026-11-05查看\",\"approvedForReport\":true},\"https://www.logitech.com/en-us/shop/p/lift-vertical-ergonomic-mouse\":{\"title\":\"Logitech Lift：美国官网\",\"summary\":\"79.99美元；57°垂直鼠标，面向中小手型并有左手版本；作为输入体验参照，不是鼠托同形态产品。\",\"source\":\"品牌官网\",\"date\":\"2026-11-05查看\",\"approvedForReport\":true},\"https://www.skg.com/products/g7-pro-fold-neck-massager\":{\"title\":\"SKG G7 PRO FOLD：官方产品页\",\"summary\":\"149.99美元，折叠、温热和App设置。页面同时出现pulse/electrodes和never electrical current，机制待说明书确认。\",\"source\":\"品牌官网\",\"date\":\"2026-11-05查看\",\"approvedForReport\":true},\"https://us.breo.com/products/n1-pro-neck-massager\":{\"title\":\"Breo N1 Pro：美国官方页与可见评论\",\"summary\":\"99.99美元，颈肩按摩；页面的有线/续航及敲击/揉捏描述互相冲突。可见评论提出固定不稳的问题。\",\"source\":\"品牌官网及自有站评论\",\"date\":\"2026-11-05查看\",\"approvedForReport\":true},\"https://kb.heartmath.com/en/emwave2/using-a-finger-sensor-with-emwave2\":{\"title\":\"HeartMath：emWave2指触传感说明\",\"summary\":\"便携模式使用集成拇指传感器或耳夹；作为指触反馈交互参照，价格和当前主机供货未确认。\",\"source\":\"品牌支持文档\",\"date\":\"2026-11-05查看\",\"approvedForReport\":true},\"https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=5B5C9F6A22637898C02AD0C9B443C22D\":{\"title\":\"国家标准：GB/T 4706.10—2024\",\"summary\":\"按摩器具安全特殊要求，官方页标注现行；该页不提供全文，不推断所有五型均属同一认证类别。\",\"source\":\"公共机构\",\"date\":\"2026-08-01实施\",\"approvedForReport\":true},\"https://hnca.miit.gov.cn/zwgk/zcwj/flfg/art/2021/art_1ece6b7f16a8415fbe74e61b02a871b9.html\":{\"title\":\"中华人民共和国个人信息保护法\",\"summary\":\"第28—30条涉及敏感信息与单独同意；跨境提供另有规则。应按具体处理活动确认适用条件。\",\"source\":\"法律官方转载\",\"date\":\"2021\",\"approvedForReport\":true},\"https://www.fda.gov/regulatory-information/search-fda-guidance-documents/general-wellness-policy-low-risk-devices\":{\"title\":\"FDA：General Wellness低风险产品指南\",\"summary\":\"一般健康用途需要与疾病诊疗宣称及实际风险区分；消费级定位不等同自动获得豁免。\",\"source\":\"监管机构\",\"date\":\"2026-01\",\"approvedForReport\":true},\"https://www.ftc.gov/business-guidance/resources/health-breach-notification-rule-basics-business\":{\"title\":\"FTC：Health Breach Notification Rule说明\",\"summary\":\"2024年修订明确涉及多数健康App及类似技术；需判断本项目是否属于适用主体。\",\"source\":\"监管机构\",\"date\":\"2024-07\",\"approvedForReport\":true},\"https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng/pdf\":{\"title\":\"欧盟GDPR原文\",\"summary\":\"第9条将健康数据列为特殊类别，处理需满足相应条件；不因产品非医疗就自动排除。\",\"source\":\"法规原文\",\"date\":\"2016\",\"approvedForReport\":true},\"https://europa.eu/youreurope/business/product-rules-compliance/general-product-compliance/index_en.htm\":{\"title\":\"Your Europe：产品合规职责\",\"summary\":\"制造商应识别产品适用规则、保留技术文件、完成相应评估与追溯；进入欧盟需按最终硬件配置核定。\",\"source\":\"公共机构\",\"date\":\"2026-11-05查看\",\"approvedForReport\":true},\"https://www.backrobo.com/\":{\"title\":\"Backrobo：Air Smart Chair C2官网\",\"summary\":\"C2美国页面价1099美元；官网描述通过气室自动适应坐姿，配套App。是气动整椅参照，不能据此改变BP电机自锁路线。\",\"source\":\"品牌官网\",\"date\":\"2026-11-06核查\",\"approvedForReport\":true},\"https://www.backrobo.com/pages/warranty\":{\"title\":\"Backrobo：保修与退货条款\",\"summary\":\"标题为10年有限保修，但附注整椅1年、部分腰部功能组件3年；非质量原因退货由客户承担运费。须按具体部件确认，不能统称整椅10年。\",\"source\":\"品牌服务条款\",\"date\":\"2026-11-06核查\",\"approvedForReport\":true},\"https://www.kickstarter.com/projects/libernovo/libernovo-omni-worlds-first-dynamic-ergonomic-chair\":{\"title\":\"LiberNovo Omni：Kickstarter项目结果\",\"summary\":\"平台展示11620名支持者、承诺金额79966705港元。是单一项目的众筹记录，不是交付量、年度营收、利润或本项目需求预测。\",\"source\":\"众筹平台项目记录\",\"date\":\"众筹期2025-06-24—08-23\",\"approvedForReport\":true},\"https://patents.google.com/patent/CN113349586B/zh\":{\"title\":\"CN113349586B：自适应椅背结构及调节方法\",\"summary\":\"权利要求涉及压力传感、电动推杆和特定调节方法。仅作相关技术初筛；Google法律状态不是官方法律结论，未完成有效性或自由实施分析。\",\"source\":\"专利公开文本镜像\",\"date\":\"2024-10-25授权公告；2026-11-06查看\",\"approvedForReport\":true},\"https://patents.google.com/patent/US20240188719A1/en\":{\"title\":\"US20240188719A1：随背支撑装置与控制方法\",\"summary\":\"公开申请涉及气囊、压力检测、控制器与久坐干预；申请人记载为Shanghai Backrobo Wellness。申请公开不等于已授权，需按国家和权利要求核实。\",\"source\":\"专利申请公开文本镜像\",\"date\":\"2024-06-13公开；2026-11-06查看\",\"approvedForReport\":true},\"https://sell.amazon.com/pricing\":{\"title\":\"Amazon美国：销售计划与佣金表\",\"summary\":\"家具类前200美元15%、超过部分10%；Home and Kitchen及Office Products为15%。费率分类未必等同店铺展示类别，另有履约、仓储、广告等费用。\",\"source\":\"平台官方收费规则\",\"date\":\"2026-11-06核查\",\"approvedForReport\":true},\"https://libernovo.com/policies/refund-policy\":{\"title\":\"LiberNovo美国：退货政策\",\"summary\":\"符合条件的直购订单30天退货，品牌承担退回运费；原包装、配件及状态有要求，美国补纸箱约29美元；第三方渠道不适用该直购条款。\",\"source\":\"品牌服务条款\",\"date\":\"政策更新2026-10-08；2026-11-06查看\",\"approvedForReport\":true},\"https://pdf.dfcfw.com/pdf/H22_AN202604301821852218_1.pdf\":{\"title\":\"恒林股份：2026年4月投资者关系活动记录\",\"summary\":\"该时点公司称S800主要处于市场推广和品牌展示阶段；不能据此认定2026年11月仍处于相同阶段，也不能把公司整体收入归因于S800。\",\"source\":\"上市公司披露文件镜像\",\"date\":\"2026-04-30\",\"approvedForReport\":true},\"https://apps.apple.com/cn/app/%E6%81%92%E6%9E%97%E6%99%BA%E5%AE%B6/id6761041270\":{\"title\":\"恒林智家：官方开发者App页面\",\"summary\":\"开发者为恒林家居股份有限公司；描述S800智能追腰、加热、座垫通风、报告与提醒。功能为开发者宣称，App上架不等于功能独立验证或可推算硬件销量。\",\"source\":\"官方开发者应用商店页面\",\"date\":\"2026-11-06核查\",\"approvedForReport\":true},\"https://www.jd.com/brand/9847a3fdb2739a8f18f2.html?electedExtAttrSet=3379%2C&extAttrValue=expand_name%2C%40165509%3A%3A3379&sort_type=sort_redissale_desc\":{\"title\":\"京东：YOTOK相关腰部支撑靠垫商品线索\",\"summary\":\"可见优藤悠居YOTOK腰撑商品标题；未匹配朋友所发商品的完整型号、规格与成交价。标题中的日本并非品牌归属核验，评论量不能换算销量或收入。\",\"source\":\"电商聚合目录\",\"date\":\"2026-11-06读取\",\"approvedForReport\":true},\"https://rheofit.com.cn/\":{\"title\":\"云望创新：中国官网产品介绍\",\"summary\":\"RheoFit A1自动滚动按摩产品，介绍运动后及久坐后放松、App、可换按摩套和速度调节；效果与AI能力为品牌宣称。\",\"source\":\"品牌官网\",\"date\":\"2026-11-06读取\",\"approvedForReport\":true},\"https://rheofit.com/zh-hans/products/rheofita1\":{\"title\":\"RheoFit A1：美国销售页面\",\"summary\":\"页面地区明确为美国、币种USD，A1选项显示379美元；简体中文界面不是中国售价。用作跨品类自动化体验案例，不等同办公靠背。\",\"source\":\"品牌官网\",\"date\":\"2026-11-06读取\",\"approvedForReport\":true},\"https://www.moonbird.life/products/moonbird\":{\"title\":\"Moonbird：手持呼吸引导产品\",\"summary\":\"美国页面基础设备加基础App为179.99美元；设备加一年高级App为199.99美元活动价。官网描述光学PPG与触觉起伏引导，可独立使用；未独立验证健康效果。\",\"source\":\"品牌官网\",\"date\":\"2026-11-06读取\",\"approvedForReport\":true},\"https://consumer.huawei.com/cn/support/content/zh-cn00737155/\":{\"title\":\"华为：手表及手环呼吸训练说明\",\"summary\":\"可设置训练时长和节奏，跟随屏幕提示；部分训练限特定设备。作为既有设备的呼吸引导任务替代，不等于指触硬件。\",\"source\":\"品牌支持文档\",\"date\":\"2026-11-06读取\",\"approvedForReport\":true},\"https://consumer.huawei.com/cn/support/content/zh-cn15935094/\":{\"title\":\"华为WATCH FIT/FIT new：功能兼容性表\",\"summary\":\"对应型号支持呼吸训练和久坐提醒。未核实当前价格和供货，不把所有华为型号配置混用。\",\"source\":\"品牌支持文档\",\"date\":\"2026-11-06读取\",\"approvedForReport\":true},\"https://myosuploads3.banggood.com/products/20210428/20210428025833hipee-202002041.pdf\":{\"title\":\"HiPee智能矫姿精灵：历史说明书镜像\",\"summary\":\"记录姿态基准、设置角度与延迟、振动提醒及暂停等交互。历史文档不能证明当前在售版本、价格或App可用性。\",\"source\":\"零售商托管说明书\",\"date\":\"2021年路径；2026-11-06读取\",\"approvedForReport\":true},\"https://zhongce.sina.com.cn/iframe/article/view/112534/\":{\"title\":\"HiPee：一名用户的历史试用记录\",\"summary\":\"作者描述设置方便，同时提及洗碗场景提醒问题及振动强度不可调。仅为旧版个人体验线索，不代表总体故障率或当前版本表现。\",\"source\":\"公开个人试用文章\",\"date\":\"2021-11-29；2026-11-06读取\",\"approvedForReport\":true},\"https://www.jd.com/brand/670aec8191e37a9364b.html?catID=826&electedExtAttrSet=&extAttrValue=expand_name%2C&sort_type=sort_redissale_desc\":{\"title\":\"京东：绿联护腕鼠标垫产品目录\",\"summary\":\"显示记忆棉护腕鼠标垫等国内在售线索；未取得稳定单SKU价格，不能把系列评论量或海外规格直接并到国内款。\",\"source\":\"电商聚合目录\",\"date\":\"2026-11-06读取\",\"approvedForReport\":true},\"https://www.ugreenindia.com/products/ugreen-ergonomic-mouse-pad-with-wrist-rest-support-slow-rebound-memory-foam-mouse-mat-pain-relief-typing-desk-mouse-pad-with-easy-glide-surface-and-non-slip-pu-base-for-gaming-and-working-black-25245\":{\"title\":\"UGREEN India：25245护腕鼠标垫销售页\",\"summary\":\"页面SKU 25245、印度卢比999；用于补充系列线索，不能写成中国价格或认定与国内商品配置相同。\",\"source\":\"区域销售网站\",\"date\":\"2026-11-06读取\",\"approvedForReport\":true},\"https://www.ithome.com/0/822/843.htm\":{\"title\":\"IT之家：米家智能肩颈按摩仪开售\",\"summary\":\"报道首发299元、建议零售399元，揉捏、两挡热敷和米家App。是历史价格事件，不是本次成交价；与颈部按摩仪、颈枕按摩仪分开。\",\"source\":\"有日期的媒体报道\",\"date\":\"2025-01-07；2026-11-06读取\",\"approvedForReport\":true},\"https://www.czur.com/detail/22?id=221\":{\"title\":\"成者官网：坐姿佳视觉AI坐姿仪发布记录\",\"summary\":\"桌面视觉坐姿及久坐提醒，灵敏度与提醒时长可设。文中249/349元为历史基础/旗舰版本价；当前供货与隐私实现待核实。\",\"source\":\"品牌转载发布报道\",\"date\":\"2021年发布资料；2026-11-06读取\",\"approvedForReport\":true}},\"sources\":[{\"id\":\"S01\",\"title\":\"用户提供：千里复序 BP（31页）\",\"url\":\"\",\"kind\":\"用户材料\",\"period\":\"2026-10\",\"summary\":\"五类终端、主动靠背路线和财务假设；用户明确以BP为准。概念图不是样机，经营模型不是实际业绩。\",\"checked\":\"2026-11-05\"},{\"id\":\"S02\",\"title\":\"WHO：Low back pain\",\"url\":\"https://www.who.int/news-room/fact-sheets/detail/low-back-pain\",\"kind\":\"公共机构\",\"period\":\"2023-06-19\",\"summary\":\"2020年全球下背痛估计6.19亿人；不是办公人群、购买人口或本产品疗效。\",\"checked\":\"2026-11-05\"},{\"id\":\"S03\",\"title\":\"Cochrane：工作间歇干预综述\",\"url\":\"https://www.cochrane.org/evidence/CD012886_work-break-interventions-preventing-musculoskeletal-symptoms-and-disorders-healthy-workers\",\"kind\":\"系统综述\",\"period\":\"2025-10\",\"summary\":\"9项研究、626人，证据搜索截至2024年5月；总体确定性很低。\",\"checked\":\"2026-11-05\"},{\"id\":\"S04\",\"title\":\"SJWEH：主动间歇与姿势变化随机试验\",\"url\":\"https://www.sjweh.fi/show_abstract.php?abstract_id=3949\",\"kind\":\"同行评审研究\",\"period\":\"2021\",\"summary\":\"曼谷6家机构193人，6个月随访；特定干预有积极结果，不能外推为千里复序疗效。\",\"checked\":\"2026-11-05\"},{\"id\":\"S05\",\"title\":\"国家统计局：2025年统计公报\",\"url\":\"https://www.stats.gov.cn/sj/zxfb/202602/t20260228_1962662.html\",\"kind\":\"公共机构\",\"period\":\"2026-02-28\",\"summary\":\"2025年末城镇就业4.7535亿人；包括大量非桌面岗位，不是项目TAM。\",\"checked\":\"2026-11-05\"},{\"id\":\"S06\",\"title\":\"美国BLS：2025年远程工作与职业\",\"url\":\"https://www.bls.gov/cps/cpsaat60.htm\",\"kind\":\"公共机构\",\"period\":\"2026-02-20\",\"summary\":\"2025年年度估计为剔除10月的11个月平均。全部在岗人员22.4%曾在参考周远程工作；计算机与数学职业65.4%。\",\"checked\":\"2026-11-05\"},{\"id\":\"S07\",\"title\":\"Eurofound：混合办公政策简报\",\"url\":\"https://www.eurofound.europa.eu/en/publications/all/hybrid-workplace-ensuring-benefits-for-workers-and-organisations\",\"kind\":\"公共机构\",\"period\":\"2025-11-11\",\"summary\":\"基于EWCS 2024和组织案例；提示家庭工作站人体工学、休息与工作边界问题。\",\"checked\":\"2026-11-05\"},{\"id\":\"S08\",\"title\":\"GVR：全球人体工学椅市场\",\"url\":\"https://www.grandviewresearch.com/industry-analysis/ergonomic-chair-market-report\",\"kind\":\"商业研究摘要\",\"period\":\"2023—2030口径\",\"summary\":\"2022年98亿美元；2030年约168亿美元预测；只作相邻行业背景，未取得完整方法或报告。\",\"checked\":\"2026-11-05\"},{\"id\":\"S09\",\"title\":\"GVR：中国人体工学椅市场\",\"url\":\"https://www.grandviewresearch.com/horizon/outlook/ergonomic-chair-market/china\",\"kind\":\"商业研究摘要\",\"period\":\"2022—2030口径\",\"summary\":\"2022年8.207亿美元，2030年17.43亿美元预测；非智能外挂靠背市场，公开页存在分类与名单瑕疵。\",\"checked\":\"2026-11-05\"},{\"id\":\"S10\",\"title\":\"奥佳华：2025年年度报告\",\"url\":\"https://static.cninfo.com.cn/finalpage/2026-04-29/1225247859.PDF\",\"kind\":\"上市公司披露\",\"period\":\"2026-04-29\",\"summary\":\"营收50.869亿元；主营国内同比-6.81%、国外+10.30%；年报还披露旗舰产品力检测和闭环控制。公司案例不代表全行业。\",\"checked\":\"2026-11-05\"},{\"id\":\"S11\",\"title\":\"倍轻松：2025年年度报告（公告镜像）\",\"url\":\"https://vip.stock.finance.sina.com.cn/corp/view/vCB_AllBulletinDetail.php?id=12286488\",\"kind\":\"上市公司披露镜像\",\"period\":\"2026-04-30\",\"summary\":\"营收7.790亿元、归母净利润-0.973亿元、销售费用4.127亿元；销售费用率约52.98%，不等同广告费率。\",\"checked\":\"2026-11-05\"},{\"id\":\"S12\",\"title\":\"HBADA X7：美国官网\",\"url\":\"https://hbada.com/products/hbada-x7-smart-ergonomic-chair\",\"kind\":\"品牌官网\",\"period\":\"2026-11-05查看\",\"summary\":\"自动腰部跟随、按摩与加热为官方宣称；X7页面选中型号1169美元，999美元是X7 Air，不能混用。\",\"checked\":\"2026-11-05\"},{\"id\":\"S13\",\"title\":\"LiberNovo Omni Gen：美国官网\",\"url\":\"https://libernovo.com/products/libernovo-omni-dynamic-ergonomic-chair\",\"kind\":\"品牌官网\",\"period\":\"2026-11-05查看\",\"summary\":\"Omni Gen整椅页面价1019美元；电动调节、动态支撑、OmniStretch。未据此认定其有BP同构压力闭环。\",\"checked\":\"2026-11-05\"},{\"id\":\"S14\",\"title\":\"LiberNovo Omni：欧盟官网\",\"url\":\"https://eu.libernovo.com/products/libernovo-omni-dynamic-ergonomic-chair\",\"kind\":\"品牌官网\",\"period\":\"2026-11-05查看\",\"summary\":\"页面展示1049欧元；页面合并Omni/Omni Gen选项，具体结算配置需再核实，不与美国SKU机械比价。\",\"checked\":\"2026-11-05\"},{\"id\":\"S15\",\"title\":\"SIHOO Doro S300：美国官网\",\"url\":\"https://www.sihoo.com/products/sihoo-doro-s300-gravity-defying-ergonomic-chair\",\"kind\":\"品牌官网\",\"period\":\"2026-11-05查看\",\"summary\":\"599.99美元；双动态腰托与机械调节整椅。动态支撑不必然意味着电动或传感控制。\",\"checked\":\"2026-11-05\"},{\"id\":\"S16\",\"title\":\"SIHOO Doro S300：日本官网\",\"url\":\"https://sihoooffice.co.jp/products/sihoo-s300\",\"kind\":\"品牌官网\",\"period\":\"2026-11-05查看\",\"summary\":\"S300页面显示107999日元促销价；供日本市场价格及本地销售入口参考。\",\"checked\":\"2026-11-05\"},{\"id\":\"S17\",\"title\":\"OSIM Invisible Massage Chair：美国官网\",\"url\":\"https://us.osim.com/products/invisible-massage-chair\",\"kind\":\"品牌官网\",\"period\":\"2026-11-05查看\",\"summary\":\"1398美元，两件组合为uJolly Sync背部按摩器和uPhoria Sync腿部按摩器。不能把两件组合等同BP五型统一协议。\",\"checked\":\"2026-11-05\"},{\"id\":\"S18\",\"title\":\"IT之家：米家智能腰背按摩仪开售\",\"url\":\"https://m.ithome.com/html/1016344.htm\",\"kind\":\"媒体报道\",\"period\":\"2026-10-22\",\"summary\":\"报道首销599元、建议零售699元；450mm导轨、热敷、米家App。不是11月5日结算价。\",\"checked\":\"2026-11-05\"},{\"id\":\"S19\",\"title\":\"IT之家：米家智能腰部按摩仪2上架\",\"url\":\"https://www.ithome.com/1/018/769.htm\",\"kind\":\"媒体报道\",\"period\":\"2026-10-28\",\"summary\":\"报道建议零售499元、11月4日起众筹379元；腰臀按摩与热敷。与腰背按摩仪是不同SKU。\",\"checked\":\"2026-11-05\"},{\"id\":\"S20\",\"title\":\"COMFIER：颈背揉捏、气压、热敷靠垫\",\"url\":\"https://www.comfier.com/collections/back-massager/products/comfier-neck-back-massager-2309\",\"kind\":\"品牌官网\",\"period\":\"2026-11-05查看\",\"summary\":\"229.99美元；网页标题2307、URL及图片2309，保留型号冲突，采购前核对铭牌。\",\"checked\":\"2026-11-05\"},{\"id\":\"S21\",\"title\":\"Snailax：SL256按摩靠垫\",\"url\":\"https://www.snailax.com/products/shiatsu-massage-cushion-with-heat-256\",\"kind\":\"品牌官网\",\"period\":\"2026-11-05查看\",\"summary\":\"页面价119.99美元；背部游走揉捏、热敷，座部振动。不同选项不能合并成单一配置。\",\"checked\":\"2026-11-05\"},{\"id\":\"S22\",\"title\":\"COMFIER：CF2206振动靠垫\",\"url\":\"https://www.comfier.com/collections/back-massager/products/vibration-massage-seat-cushion-2206\",\"kind\":\"品牌官网\",\"period\":\"2026-11-05查看\",\"summary\":\"黑色选项69.99美元，10个振动电机；其振动功能不等于揉捏或主动腰托。\",\"checked\":\"2026-11-05\"},{\"id\":\"S23\",\"title\":\"UPRIGHT GO 2：官方产品页\",\"url\":\"https://www.uprightpose.com/upright-go2/\",\"kind\":\"品牌官网\",\"period\":\"2026-11-05查看\",\"summary\":\"页面79美元；姿态提醒、振动、免费App。官网健康效果百分比未经本报告独立验证，不采用。\",\"checked\":\"2026-11-05\"},{\"id\":\"S24\",\"title\":\"DeltaHub Carpio 2.0：官方产品页与可见评论\",\"url\":\"https://deltahub.io/products/carpio-ergonomic-wrist-rest\",\"kind\":\"品牌官网及自有站评论\",\"period\":\"2026-11-05查看\",\"summary\":\"单只34.90美元；滑动掌托。可见评论涉及粘手、切换键盘时移位、重新找支撑位置；非随机评价样本。\",\"checked\":\"2026-11-05\"},{\"id\":\"S25\",\"title\":\"Logitech Lift：美国官网\",\"url\":\"https://www.logitech.com/en-us/shop/p/lift-vertical-ergonomic-mouse\",\"kind\":\"品牌官网\",\"period\":\"2026-11-05查看\",\"summary\":\"79.99美元；57°垂直鼠标，面向中小手型并有左手版本；作为输入体验参照，不是鼠托同形态产品。\",\"checked\":\"2026-11-05\"},{\"id\":\"S26\",\"title\":\"SKG G7 PRO FOLD：官方产品页\",\"url\":\"https://www.skg.com/products/g7-pro-fold-neck-massager\",\"kind\":\"品牌官网\",\"period\":\"2026-11-05查看\",\"summary\":\"149.99美元，折叠、温热和App设置。页面同时出现pulse/electrodes和never electrical current，机制待说明书确认。\",\"checked\":\"2026-11-05\"},{\"id\":\"S27\",\"title\":\"Breo N1 Pro：美国官方页与可见评论\",\"url\":\"https://us.breo.com/products/n1-pro-neck-massager\",\"kind\":\"品牌官网及自有站评论\",\"period\":\"2026-11-05查看\",\"summary\":\"99.99美元，颈肩按摩；页面的有线/续航及敲击/揉捏描述互相冲突。可见评论提出固定不稳的问题。\",\"checked\":\"2026-11-05\"},{\"id\":\"S28\",\"title\":\"HeartMath：emWave2指触传感说明\",\"url\":\"https://kb.heartmath.com/en/emwave2/using-a-finger-sensor-with-emwave2\",\"kind\":\"品牌支持文档\",\"period\":\"2026-11-05查看\",\"summary\":\"便携模式使用集成拇指传感器或耳夹；作为指触反馈交互参照，价格和当前主机供货未确认。\",\"checked\":\"2026-11-05\"},{\"id\":\"S29\",\"title\":\"国家标准：GB/T 4706.10—2024\",\"url\":\"https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=5B5C9F6A22637898C02AD0C9B443C22D\",\"kind\":\"公共机构\",\"period\":\"2026-08-01实施\",\"summary\":\"按摩器具安全特殊要求，官方页标注现行；该页不提供全文，不推断所有五型均属同一认证类别。\",\"checked\":\"2026-11-05\"},{\"id\":\"S30\",\"title\":\"中华人民共和国个人信息保护法\",\"url\":\"https://hnca.miit.gov.cn/zwgk/zcwj/flfg/art/2021/art_1ece6b7f16a8415fbe74e61b02a871b9.html\",\"kind\":\"法律官方转载\",\"period\":\"2021\",\"summary\":\"第28—30条涉及敏感信息与单独同意；跨境提供另有规则。应按具体处理活动确认适用条件。\",\"checked\":\"2026-11-05\"},{\"id\":\"S31\",\"title\":\"FDA：General Wellness低风险产品指南\",\"url\":\"https://www.fda.gov/regulatory-information/search-fda-guidance-documents/general-wellness-policy-low-risk-devices\",\"kind\":\"监管机构\",\"period\":\"2026-01\",\"summary\":\"一般健康用途需要与疾病诊疗宣称及实际风险区分；消费级定位不等同自动获得豁免。\",\"checked\":\"2026-11-05\"},{\"id\":\"S32\",\"title\":\"FTC：Health Breach Notification Rule说明\",\"url\":\"https://www.ftc.gov/business-guidance/resources/health-breach-notification-rule-basics-business\",\"kind\":\"监管机构\",\"period\":\"2024-07\",\"summary\":\"2024年修订明确涉及多数健康App及类似技术；需判断本项目是否属于适用主体。\",\"checked\":\"2026-11-05\"},{\"id\":\"S33\",\"title\":\"欧盟GDPR原文\",\"url\":\"https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng/pdf\",\"kind\":\"法规原文\",\"period\":\"2016\",\"summary\":\"第9条将健康数据列为特殊类别，处理需满足相应条件；不因产品非医疗就自动排除。\",\"checked\":\"2026-11-05\"},{\"id\":\"S34\",\"title\":\"欧盟GPSR官方摘要（正文访问受限）\",\"url\":\"https://eur-lex.europa.eu/legal-content/en/TXT/?uri=LEGISSUM%3A4670517\",\"kind\":\"官方搜索摘要\",\"period\":\"2026-11-05检索\",\"summary\":\"官方索引摘要说明欧盟责任主体要求；正文受JavaScript验证限制，仅作初筛，未完成逐条适用性审查。\",\"checked\":\"2026-11-05\"},{\"id\":\"S35\",\"title\":\"Your Europe：产品合规职责\",\"url\":\"https://europa.eu/youreurope/business/product-rules-compliance/general-product-compliance/index_en.htm\",\"kind\":\"公共机构\",\"period\":\"2026-11-05查看\",\"summary\":\"制造商应识别产品适用规则、保留技术文件、完成相应评估与追溯；进入欧盟需按最终硬件配置核定。\",\"checked\":\"2026-11-05\"},{\"id\":\"S36\",\"title\":\"Backrobo：Air Smart Chair C2官网\",\"url\":\"https://www.backrobo.com/\",\"kind\":\"品牌官网\",\"period\":\"2026-11-06核查\",\"summary\":\"C2美国页面价1099美元；官网描述通过气室自动适应坐姿，配套App。是气动整椅参照，不能据此改变BP电机自锁路线。\",\"checked\":\"2026-11-06\"},{\"id\":\"S37\",\"title\":\"Backrobo：保修与退货条款\",\"url\":\"https://www.backrobo.com/pages/warranty\",\"kind\":\"品牌服务条款\",\"period\":\"2026-11-06核查\",\"summary\":\"标题为10年有限保修，但附注整椅1年、部分腰部功能组件3年；非质量原因退货由客户承担运费。须按具体部件确认，不能统称整椅10年。\",\"checked\":\"2026-11-06\"},{\"id\":\"S38\",\"title\":\"LiberNovo Omni：Kickstarter项目结果\",\"url\":\"https://www.kickstarter.com/projects/libernovo/libernovo-omni-worlds-first-dynamic-ergonomic-chair\",\"kind\":\"众筹平台项目记录\",\"period\":\"众筹期2025-06-24—08-23\",\"summary\":\"平台展示11620名支持者、承诺金额79966705港元。是单一项目的众筹记录，不是交付量、年度营收、利润或本项目需求预测。\",\"checked\":\"2026-11-06\"},{\"id\":\"S39\",\"title\":\"CN113349586B：自适应椅背结构及调节方法\",\"url\":\"https://patents.google.com/patent/CN113349586B/zh\",\"kind\":\"专利公开文本镜像\",\"period\":\"2024-10-25授权公告；2026-11-06查看\",\"summary\":\"权利要求涉及压力传感、电动推杆和特定调节方法。仅作相关技术初筛；Google法律状态不是官方法律结论，未完成有效性或自由实施分析。\",\"checked\":\"2026-11-06\"},{\"id\":\"S40\",\"title\":\"US20240188719A1：随背支撑装置与控制方法\",\"url\":\"https://patents.google.com/patent/US20240188719A1/en\",\"kind\":\"专利申请公开文本镜像\",\"period\":\"2024-06-13公开；2026-11-06查看\",\"summary\":\"公开申请涉及气囊、压力检测、控制器与久坐干预；申请人记载为Shanghai Backrobo Wellness。申请公开不等于已授权，需按国家和权利要求核实。\",\"checked\":\"2026-11-06\"},{\"id\":\"S41\",\"title\":\"Amazon美国：销售计划与佣金表\",\"url\":\"https://sell.amazon.com/pricing\",\"kind\":\"平台官方收费规则\",\"period\":\"2026-11-06核查\",\"summary\":\"家具类前200美元15%、超过部分10%；Home and Kitchen及Office Products为15%。费率分类未必等同店铺展示类别，另有履约、仓储、广告等费用。\",\"checked\":\"2026-11-06\"},{\"id\":\"S42\",\"title\":\"LiberNovo美国：退货政策\",\"url\":\"https://libernovo.com/policies/refund-policy\",\"kind\":\"品牌服务条款\",\"period\":\"政策更新2026-10-08；2026-11-06查看\",\"summary\":\"符合条件的直购订单30天退货，品牌承担退回运费；原包装、配件及状态有要求，美国补纸箱约29美元；第三方渠道不适用该直购条款。\",\"checked\":\"2026-11-06\"},{\"id\":\"S43\",\"title\":\"恒林股份：2026年4月投资者关系活动记录\",\"url\":\"https://pdf.dfcfw.com/pdf/H22_AN202604301821852218_1.pdf\",\"kind\":\"上市公司披露文件镜像\",\"period\":\"2026-04-30\",\"summary\":\"该时点公司称S800主要处于市场推广和品牌展示阶段；不能据此认定2026年11月仍处于相同阶段，也不能把公司整体收入归因于S800。\",\"checked\":\"2026-11-06\"},{\"id\":\"S44\",\"title\":\"恒林智家：官方开发者App页面\",\"url\":\"https://apps.apple.com/cn/app/%E6%81%92%E6%9E%97%E6%99%BA%E5%AE%B6/id6761041270\",\"kind\":\"官方开发者应用商店页面\",\"period\":\"2026-11-06核查\",\"summary\":\"开发者为恒林家居股份有限公司；描述S800智能追腰、加热、座垫通风、报告与提醒。功能为开发者宣称，App上架不等于功能独立验证或可推算硬件销量。\",\"checked\":\"2026-11-06\"},{\"id\":\"S45\",\"title\":\"项目范围说明：用户提供的聊天截图\",\"url\":\"\",\"kind\":\"用户提供的任务背景\",\"period\":\"2026-11-06读取\",\"summary\":\"仅用于确认项目范围与研究方向：便携式配件、五类竞品、定位与优势；产品图仍会更新，首发顺序尚未确定。\",\"checked\":\"2026-11-06\"},{\"id\":\"S46\",\"title\":\"京东：YOTOK相关腰部支撑靠垫商品线索\",\"url\":\"https://www.jd.com/brand/9847a3fdb2739a8f18f2.html?electedExtAttrSet=3379%2C&extAttrValue=expand_name%2C%40165509%3A%3A3379&sort_type=sort_redissale_desc\",\"kind\":\"电商聚合目录\",\"period\":\"2026-11-06读取\",\"summary\":\"可见优藤悠居YOTOK腰撑商品标题；未匹配朋友所发商品的完整型号、规格与成交价。标题中的日本并非品牌归属核验，评论量不能换算销量或收入。\",\"checked\":\"2026-11-06\"},{\"id\":\"S47\",\"title\":\"云望创新：中国官网产品介绍\",\"url\":\"https://rheofit.com.cn/\",\"kind\":\"品牌官网\",\"period\":\"2026-11-06读取\",\"summary\":\"RheoFit A1自动滚动按摩产品，介绍运动后及久坐后放松、App、可换按摩套和速度调节；效果与AI能力为品牌宣称。\",\"checked\":\"2026-11-06\"},{\"id\":\"S48\",\"title\":\"RheoFit A1：美国销售页面\",\"url\":\"https://rheofit.com/zh-hans/products/rheofita1\",\"kind\":\"品牌官网\",\"period\":\"2026-11-06读取\",\"summary\":\"页面地区明确为美国、币种USD，A1选项显示379美元；简体中文界面不是中国售价。用作跨品类自动化体验案例，不等同办公靠背。\",\"checked\":\"2026-11-06\"},{\"id\":\"S49\",\"title\":\"Moonbird：手持呼吸引导产品\",\"url\":\"https://www.moonbird.life/products/moonbird\",\"kind\":\"品牌官网\",\"period\":\"2026-11-06读取\",\"summary\":\"美国页面基础设备加基础App为179.99美元；设备加一年高级App为199.99美元活动价。官网描述光学PPG与触觉起伏引导，可独立使用；未独立验证健康效果。\",\"checked\":\"2026-11-06\"},{\"id\":\"S50\",\"title\":\"华为：手表及手环呼吸训练说明\",\"url\":\"https://consumer.huawei.com/cn/support/content/zh-cn00737155/\",\"kind\":\"品牌支持文档\",\"period\":\"2026-11-06读取\",\"summary\":\"可设置训练时长和节奏，跟随屏幕提示；部分训练限特定设备。作为既有设备的呼吸引导任务替代，不等于指触硬件。\",\"checked\":\"2026-11-06\"},{\"id\":\"S51\",\"title\":\"华为WATCH FIT/FIT new：功能兼容性表\",\"url\":\"https://consumer.huawei.com/cn/support/content/zh-cn15935094/\",\"kind\":\"品牌支持文档\",\"period\":\"2026-11-06读取\",\"summary\":\"对应型号支持呼吸训练和久坐提醒。未核实当前价格和供货，不把所有华为型号配置混用。\",\"checked\":\"2026-11-06\"},{\"id\":\"S52\",\"title\":\"HiPee智能矫姿精灵：历史说明书镜像\",\"url\":\"https://myosuploads3.banggood.com/products/20210428/20210428025833hipee-202002041.pdf\",\"kind\":\"零售商托管说明书\",\"period\":\"2021年路径；2026-11-06读取\",\"summary\":\"记录姿态基准、设置角度与延迟、振动提醒及暂停等交互。历史文档不能证明当前在售版本、价格或App可用性。\",\"checked\":\"2026-11-06\"},{\"id\":\"S53\",\"title\":\"HiPee：一名用户的历史试用记录\",\"url\":\"https://zhongce.sina.com.cn/iframe/article/view/112534/\",\"kind\":\"公开个人试用文章\",\"period\":\"2021-11-29；2026-11-06读取\",\"summary\":\"作者描述设置方便，同时提及洗碗场景提醒问题及振动强度不可调。仅为旧版个人体验线索，不代表总体故障率或当前版本表现。\",\"checked\":\"2026-11-06\"},{\"id\":\"S54\",\"title\":\"京东：绿联护腕鼠标垫产品目录\",\"url\":\"https://www.jd.com/brand/670aec8191e37a9364b.html?catID=826&electedExtAttrSet=&extAttrValue=expand_name%2C&sort_type=sort_redissale_desc\",\"kind\":\"电商聚合目录\",\"period\":\"2026-11-06读取\",\"summary\":\"显示记忆棉护腕鼠标垫等国内在售线索；未取得稳定单SKU价格，不能把系列评论量或海外规格直接并到国内款。\",\"checked\":\"2026-11-06\"},{\"id\":\"S55\",\"title\":\"UGREEN India：25245护腕鼠标垫销售页\",\"url\":\"https://www.ugreenindia.com/products/ugreen-ergonomic-mouse-pad-with-wrist-rest-support-slow-rebound-memory-foam-mouse-mat-pain-relief-typing-desk-mouse-pad-with-easy-glide-surface-and-non-slip-pu-base-for-gaming-and-working-black-25245\",\"kind\":\"区域销售网站\",\"period\":\"2026-11-06读取\",\"summary\":\"页面SKU 25245、印度卢比999；用于补充系列线索，不能写成中国价格或认定与国内商品配置相同。\",\"checked\":\"2026-11-06\"},{\"id\":\"S56\",\"title\":\"IT之家：米家智能肩颈按摩仪开售\",\"url\":\"https://www.ithome.com/0/822/843.htm\",\"kind\":\"有日期的媒体报道\",\"period\":\"2025-01-07；2026-11-06读取\",\"summary\":\"报道首发299元、建议零售399元，揉捏、两挡热敷和米家App。是历史价格事件，不是本次成交价；与颈部按摩仪、颈枕按摩仪分开。\",\"checked\":\"2026-11-06\"},{\"id\":\"S57\",\"title\":\"成者官网：坐姿佳视觉AI坐姿仪发布记录\",\"url\":\"https://www.czur.com/detail/22?id=221\",\"kind\":\"品牌转载发布报道\",\"period\":\"2021年发布资料；2026-11-06读取\",\"summary\":\"桌面视觉坐姿及久坐提醒，灵敏度与提醒时长可设。文中249/349元为历史基础/旗舰版本价；当前供货与隐私实现待核实。\",\"checked\":\"2026-11-06\"}]}");
const jsonValue0$2 = value$2["title"];const jsonValue1$2 = value$2["subtitle"];const jsonValue2$1 = value$2["sections"];const jsonValue3$1 = value$2["sourcePreviews"];const jsonValue4$1 = value$2["sources"];

function assertDataViewSchema(schema) {
  for (const [query, contract] of Object.entries(schema)) {
    for (const field of contract.breakdown ?? [])
      if (!Object.hasOwn(contract.columns, field)) throw new Error(`Data view: ${query} breakdown has no declared ${field} field.`);
  }
}

function assertReviewedRows(query, contract, rows) {
  if (!Array.isArray(rows)) throw new Error(`Data view: ${query} has no loaded reviewed rows.`);
  const fields = Object.entries(contract.columns);
  for (const [index, row] of rows.entries()) {
    if (!row || typeof row !== "object" || Array.isArray(row)) throw new Error(`Data view: ${query} row ${index + 1} is not a record.`);
    for (const [field, column] of fields) {
      const definition = typeof column === "string" ? { type: column } : column;
      const value = row[field];
      if (value === undefined && definition.optional || value === null && definition.nullable) continue;
      const valid = value !== undefined && value !== null && (definition.type === "unknown" || (definition.type === "date"
        ? typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
          && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value
        : typeof value === definition.type && (definition.type !== "number" || Number.isFinite(value))));
      if (!valid) throw new Error(`Data view: ${query}.${field} row ${index + 1} must be ${definition.type}${definition.nullable ? " or null" : ""}.`);
    }
  }
}

function assertFilterFields(schema, filters) {
  for (const filter of filters) {
    for (const [query, contract] of Object.entries(schema)) {
      if ((!filter.queryIds || filter.queryIds.includes(query)) && !Object.hasOwn(contract.columns, filter.field))
        throw new Error(`Data view: filter ${filter.id} targets ${query}, which has no ${filter.field} field. Declare its queryIds or correct the contract.`);
    }
  }
}

;


const EvidenceContext = react.createContext(null);
/** Existing report citations can join the active scope without knowing its schema. */
function useDataViewEvidence(query) {
  return react.useContext(EvidenceContext)?.(query);
}

const boundProps = ["queryId", "queryIds", "sourceRows", "displayRows", "scopeFilters", "sourceRowsByQuery", "sectionFilters"] ;

function componentProps(props) {
  const conflict = boundProps.find(key => Object.hasOwn(props, key));
  if (conflict) throw new Error(`Data view: ${conflict} is supplied by the active query scope.`);
  return props;
}




















/** Initialize once at module scope. The shell remains the sole owner of view state. */
function createDataView(schema) {
  assertDataViewSchema(schema);
  









  const Context = react.createContext(null);
  // Query updates replace row arrays. Share validation across components/scopes,
  // but never reuse it for a refreshed array or another query contract.
  const checked = new Map();
  const ids = Object.keys(schema);

  function useView() {
    const view = react.useContext(Context);
    if (!view) throw new Error("Data view components must be inside View.Provider.");
    return view;
  }
  function useQuery(query) { return useView().resolve(query); }
  
  function useEvidence(query, evidenceQueries = []) {
    const { resolve } = useView();
    if (!Array.isArray(evidenceQueries)) throw new Error("Data view: evidenceQueries must be an array of reviewed query names.");
    const primary = resolve(query);
    const queryIds = [...new Set([query, ...evidenceQueries])];
    if (queryIds.length === 1) return primary;
    const bindings = queryIds.map(id => resolve(id));
    const filters = new Map();
    for (const binding of bindings) {
      for (const filter of binding.scopeFilters) {
        const key = JSON.stringify([filter.field, filter.label, filter.value]);
        const previous = filters.get(key);
        filters.set(key, { ...filter, queryIds: [...(previous?.queryIds ?? []), binding.queryId] });
      }
    }
    return { ...primary, queryIds, scopeFilters: [...filters.values()],
      sourceRowsByQuery: Object.fromEntries(bindings.map(binding => [binding.queryId, binding.sourceRows])) };
  }

  function Scope({ children, section }) {
    const app = dataApp.useDataApp();
    const parent = react.useContext(Context);
    if (section && (!parent || parent.section)) throw new Error("View.Section belongs directly within a View.Provider scope; nested section scopes are not supported.");
    const local = dataApp.useSectionFilters(section?.filters ?? [], section?.initialValues ?? {}, section ? { id: section.id, label: section.label } : undefined);
    const visibleFilterIds = app.snapshot.report?.visibleFilterIds ?? app.snapshot.visibleReportFilters;
    const definitions = (app.snapshot.filters ?? []).filter(filter => app.snapshot.surface !== "report"
      || filter.visible === true || filter.reportVisible === true || filter.surface === "report"
      || filter.surfaces?.includes("report") || (Array.isArray(visibleFilterIds) && visibleFilterIds.includes(filter.id)));
    const explicitVisibility = Array.isArray(visibleFilterIds) || (app.snapshot.filters ?? []).every(filter =>
      filter.visible !== undefined || filter.reportVisible !== undefined || filter.surface !== undefined || filter.surfaces !== undefined);
    if (section && app.snapshot.surface === "report" && definitions.length !== (app.snapshot.filters ?? []).length)
      throw new Error("Data view: remove hidden report filter definitions before adding a section scope.");
    assertFilterFields(schema, [...definitions, ...(section?.filters ?? [])]);
    const resolved = new Map();
    const resolve = (query) => {
      if (!Object.hasOwn(schema, query)) throw new Error(`Data view: unknown query ${query}.`);
      const cached = resolved.get(query);
      if (cached) return cached ;
      const contract = schema[query];
      const original = app.queries[query]?.rows;
      const seen = checked.get(query) ?? new WeakSet();
      if (!original || !seen.has(original)) {
        assertReviewedRows(query, contract, original);
        seen.add(original); checked.set(query, seen);
      }
      // Keep the declared grain/history in every consumer. Authors decide their
      // aggregation explicitly; chart and metric selection do not change scope.
      const breakdown = contract.breakdown ?? Object.keys(contract.columns);
      const pageRows = section ? undefined : app.reviewedRows(query, breakdown);
      // The shell adds page filters to Sources/export metadata. Only local
      // filters belong in scopeFilters, otherwise page labels appear twice.
      const selected = section ? local.componentProps(query, breakdown) : {
        displayRows: pageRows, sourceRows: pageRows, scopeFilters: [],
      };
      const result = { ...selected, queryId: query, rows: selected.displayRows } ;
      resolved.set(query, result); return result;
    };
    return jsxRuntime.jsx(EvidenceContext.Provider, { value: query => resolve(query ), children: jsxRuntime.jsx(Context.Provider, { value: { resolve, section: Boolean(section),
      hiddenReportFilters: !section && app.snapshot.surface === "report" && !explicitVisibility && Boolean(app.snapshot.filters?.length) && !definitions.length,
      filters: section ? local.filterProps : {
      filters: definitions, queries: app.queries, values: app.filters, onChange: app.setFilter,
    } }, children: children})});
  }
  function Provider({ children }) {
    return jsxRuntime.jsx(dataApp.QueryDataBoundary, { queryIds: ids, children: jsxRuntime.jsx(Scope, { children: children})});
  }
  function Section({ children, ...section }) {
    return jsxRuntime.jsx(Scope, { section: section, children: children});
  }
  function ViewFilters({ sticky = false, ariaLabel, clearLabel, showClear, trailingControls, children }
) {
    const view = useView();
    if (view.hiddenReportFilters)
      throw new Error("Data view: View.Filters has no visible report filters. Set report.visibleFilterIds in src/data.json to the intended filter IDs (or set visible: true on those definitions). Remove View.Filters if this report should have no filter controls.");
    return jsxRuntime.jsx(dataApp.Filters, { ...view.filters, sticky: !view.section && sticky, ariaLabel: ariaLabel ?? view.filters.ariaLabel,
      clearLabel: clearLabel, showClear: showClear ?? view.filters.showClear, trailingControls: trailingControls, children: children});
  }
  






  function Chart({ query, evidenceQueries, select, spec, id, title, summary, description, height, ...props }

) {
    const { rows, ...evidence } = useEvidence(query, evidenceQueries);
    let chart;
    try {
      [chart] = dataApp.chartConfigEntries({ schemaVersion: 1, id, title, summary, description, height: height ?? undefined,
        spec, rows: [...(select ? select(rows) : rows)] });
    } catch (error) {
      return jsxRuntime.jsx('div', { role: "alert", 'data-chart-config-error': "true", children: error instanceof Error ? error.message : String(error)});
    }
    const chartOptions = { ...props.chartOptions, canonical: true, accessibleLabel: summary ?? title };
    return jsxRuntime.jsx(dataApp.EvidenceChart, { ...componentProps(props), ...evidence,
      id: chart.id, title: chart.title, description: chart.description ?? undefined, height: chart.height,
      spec: chart.spec, rows: chart.rows, chartOptions: chartOptions,} );
  }
  

  function Metric({ query, evidenceQueries, value, trendValues, trendLabel, periodLabel, periodDescription, ...props }




) {
    const { rows, ...evidence } = useEvidence(query, evidenceQueries);
    return jsxRuntime.jsx(dataApp.MetricCard, { ...componentProps(props), ...evidence, value: value(rows),
      trendValues: typeof trendValues === "function" ? trendValues(rows) : trendValues,
      trendLabel: typeof trendLabel === "function" ? trendLabel(rows) : trendLabel,
      periodLabel: typeof periodLabel === "function" ? periodLabel(rows) : periodLabel,
      periodDescription: typeof periodDescription === "function" ? periodDescription(rows) : periodDescription,} );
  }
  




  function Table({ query, evidenceQueries, columns, table, ...props }

) {
    const { rows, ...evidence } = useEvidence(query, evidenceQueries);
    return jsxRuntime.jsx(dataApp.DataComponent, { ...componentProps(props), ...evidence, kind: "table", children: jsxRuntime.jsx(dataApp.DataTable, { ...table, rows: rows,
      columns: columns ?? Object.keys(schema[query].columns).map(field => ({ field })),} )});
  }
  function Block({ query, evidenceQueries, children, ...props }

) {
    const { rows, ...evidence } = useEvidence(query, evidenceQueries);
    return jsxRuntime.jsx(dataApp.DataComponent, { kind: "custom", ...componentProps(props), ...evidence, children: children(rows)});
  }
  return { Provider, Section, Filters: ViewFilters, Chart, Metric, Table, Block, useQuery };
}

/** @type {React.CSSProperties} */
const style = {
  background: "transparent", border: 0, color: "inherit", cursor: "pointer", font: "inherit",
  padding: "0 .15em", textAlign: "left", textDecoration: "underline",
};

/** Use the same ordered query IDs for the citations and the report's source list.
 * @param {{ queryIds: readonly string[], queryId: string, showTitle?: boolean,
 * sourceRows?: readonly import("../../data-app-public.jsx").DataRow[] }} props */
function ReportCitation({ queryIds, queryId, showTitle = false, sourceRows }) {
  const { queries, componentActions } = dataApp.useDataApp();
  const scopedEvidence = useDataViewEvidence(queryId);
  const index = queryIds.indexOf(queryId);
  const query = queries[queryId];
  if (index < 0 || !query) throw new Error("Unlisted report source: " + queryId);
  const title = query.source?.name || (typeof query.source?.label === "string" && query.source.label) || queryId;
  const number = "[" + (index + 1) + "]";
  return jsxRuntime.jsx('button', { type: "button", style: style, 'data-report-citation': showTitle ? "list" : "claim",
    'aria-label': number + " " + title,
    onClick: () => componentActions.onOpen?.("source", {
      id: "source-" + queryId, queryId, title, ...scopedEvidence,
      ...(sourceRows !== undefined ? { sourceRows } : {}),
    }), children: 
    showTitle ? number + " " + title : number
  });
}

/** @param {{ queryIds: readonly string[] }} props */
function ReportSources({ queryIds }) {
  if (!queryIds.length) return null;
  return jsxRuntime.jsxs('section', { 'aria-label': "Sources", children: [
    jsxRuntime.jsx('h2', { children: "Sources"})
    , jsxRuntime.jsx('ol', { style: { listStyle: "none", padding: 0 }, children: 
      queryIds.map(id => jsxRuntime.jsx('li', { children: jsxRuntime.jsx(ReportCitation, { queryIds: queryIds, queryId: id, showTitle: true,} )}, id))
    })
  ]});
}

/** @param {{preparedOn: string, author?: string}} props */
function ReportHeader({ preparedOn, author }) {
  const { appTitle, setAppTitle, canEdit, mode } = dataApp.useDataApp();
  const editing = canEdit && mode === "edit";
  return jsxRuntime.jsxs('header', { className: "report-hero", children: [
    jsxRuntime.jsx('h1', { 'data-data-app-title': true, contentEditable: editing, suppressContentEditableWarning: true,
      'aria-label': editing ? "Edit report heading" : undefined,
      onBlur: editing ? e => setAppTitle((e.currentTarget.textContent ?? "").trim() || appTitle) : undefined,
      onKeyDown: editing ? e => { if(e.key === "Enter") { e.preventDefault(); e.currentTarget.blur(); } } : undefined, children: 
      appTitle
    })
    , jsxRuntime.jsx(dataApp.RichNarrative, { id: "report:byline", className: "report-deck", label: "Edit report date and author"    ,
      value: [preparedOn, author].filter(Boolean).join(" · "),} )
  ]});
}

/** Keep the numbered Sources list with the claim citations when changing the body.
 * @param {{sources: readonly string[], preparedOn: string, author?: string, children: React.ReactNode,
 * className?: string, label?: string, beforeHeader?: React.ReactNode}} props */
function ReportFrame({ sources, preparedOn, author, children, className = "", label = "Analytical report", beforeHeader }) {
  return jsxRuntime.jsxs('article', { className: ["report-content", className].filter(Boolean).join(" "), 'aria-label': label, children: [
    beforeHeader
    , jsxRuntime.jsx(ReportHeader, { preparedOn: preparedOn, author: author,} )
    , children
    , jsxRuntime.jsx(ReportSources, { queryIds: sources,} )
  ]});
}

/** A lookup in reviewed report data. Use a separate query for a different display grain.
 * @param {{queryId: string, caption: string,
 * columns?: import("../../data-app-public.jsx").DataTableProps["columns"]}} props */
function ReportTable({ queryId, caption, columns }) {
  const { reviewedRows } = dataApp.useDataApp();
  return jsxRuntime.jsx(dataApp.DataTable, { rows: reviewedRows(queryId), caption: caption, columns: columns, searchable: false,} );
}

/** @typedef {{id: string, title: string, markdown: string, queryIds?: readonly string[],
 * sourceRowsByQuery?: Record<string, readonly import("../../data-app-public.jsx").DataRow[]>}} Finding */
/** @param {Finding & {sources: readonly string[]}} props */
function ReportFinding({ id, title, markdown, sources, queryIds = [], sourceRowsByQuery }) {
  const prose = jsxRuntime.jsx(dataApp.RichNarrative, { id: id + ":body", value: markdown, label: "Edit finding" , className: "report-finding-prose",} );
  const [first] = queryIds;
  if (!first) return prose;
  return jsxRuntime.jsxs(dataApp.ReportSection, { id: id, title: title, queryId: first, queryIds: queryIds, className: "report-finding",
    sourceRowsByQuery: sourceRowsByQuery, showHeading: false, children: [
    prose, " ", queryIds.map(queryId => jsxRuntime.jsx(ReportCitation, { queryIds: sources, queryId: queryId,
      sourceRows: sourceRowsByQuery?.[queryId],}, queryId ))
  ]});
}

/** @typedef {{queryId: string, config: Omit<import("../../data-app-public.jsx").SingleChart, "rows" | "columns">}} FindingChart */
/** Contextual typing preserves the visualize-data config when authoring reusable chart factories.
 * @param {string} queryId @param {FindingChart["config"]} config @returns {FindingChart} */
function chartFor(queryId, config) {
  return { queryId, config };
}

/** @param {{chart: FindingChart|null}} props */
function ReportChart({ chart }) {
  const { reviewedRows } = dataApp.useDataApp();
  if (!chart) return null;
  const rows = reviewedRows(chart.queryId);
  let resolved;
  try {
    [resolved] = dataApp.chartConfigEntries({ ...chart.config, height: chart.config.height ?? undefined, rows });
  } catch (error) {
    return jsxRuntime.jsx('div', { role: "alert", 'data-chart-config-error': "true", children: error instanceof Error ? error.message : String(error)});
  }
  /** @type {import("../../data-app-public.jsx").ChartOptions & {canonical: boolean, accessibleLabel: string}} */
  const chartOptions = { canonical: true, accessibleLabel: resolved.summary ?? resolved.title };
  return jsxRuntime.jsx(dataApp.EvidenceChart, { queryId: chart.queryId, id: resolved.id, title: resolved.title,
    description: resolved.description ?? undefined, height: resolved.height, spec: resolved.spec,
    rows: resolved.rows, sourceRows: rows, chartOptions: chartOptions,} );
}

var bp = JSON.parse("\"./assets/image.f649dd42903f67f9.png\"");

var hbada = JSON.parse("\"./assets/image.8101046484da4819.png\"");

var libernovo = JSON.parse("\"./assets/image.938b9c0790a9279e.png\"");

var osim = JSON.parse("\"./assets/image.3d3e0a94ec20d3c6.png\"");

const value$1 = JSON.parse("{\"profiles\":[{\"id\":\"touch\",\"label\":\"手触摸式\",\"short\":\"手触摸\",\"plan\":\"指触测量与节律引导\",\"task\":\"在一段短暂休息中，跟随清楚的节奏完成放松练习。\",\"conclusion\":\"触觉引导与生理反馈已有产品。要说明独立设备比已有手表或引导App多带来什么。\",\"advantage\":\"潜在差异：更顺手的启动与退出、与同一工作流程衔接。\",\"cost\":\"代价：占用一只手、接触质量要求、额外充电和购买成本。\",\"comparison\":\"对照独立手触设备与用户已有引导方式，观察启动步骤、完成情况、再次使用和实际选择。\",\"china\":\"用国内用户已经拥有的设备作基线；不要把“有呼吸训练”视为足够的购买理由。\",\"overseas\":\"对照Moonbird的基础版与高级服务边界；按美国或具体欧洲国家分别核对价格和售后。\",\"question\":\"指触测量的实际输出是什么？节律由灯光、声音还是触觉表达？以最新版功能定义确认。\",\"sids\":[\"S01\",\"S28\",\"S49\",\"S50\",\"S51\"]},{\"id\":\"wear\",\"label\":\"佩戴式\",\"short\":\"佩戴\",\"plan\":\"活动与相对倾斜感知、提醒\",\"task\":\"工作时察觉需要调整或活动的时机，提醒不要妨碍当前动作。\",\"conclusion\":\"振动提醒已有相近设备，桌面视觉装置也能争夺同一需求。重点是愿不愿戴、会不会关闭提醒。\",\"advantage\":\"潜在差异：少误提醒、少校准，以及与其他终端合理协调。\",\"cost\":\"代价：佩戴与清洁负担、误提醒、续航；位置不同会改变传感解释。\",\"comparison\":\"比较单独提醒、共享提醒与不开提醒的使用过程，记录有用提醒、被关闭的原因及持续佩戴。\",\"china\":\"HiPee历史案例可提炼测试问题；重新核实在售版本与软件服务，不将旧评测写成当前缺陷。\",\"overseas\":\"以UPRIGHT GO 2为相近功能参照；核实固定方式、耗材、退货与免费App边界。\",\"question\":\"佩戴在哪里、什么时候提醒？BP未授权扩展成隔衣连续生理测量。\",\"sids\":[\"S01\",\"S23\",\"S52\",\"S53\",\"S57\"]},{\"id\":\"mouse\",\"label\":\"人体工学鼠托\",\"short\":\"鼠托\",\"plan\":\"输入与掌根受力感知、支撑\",\"task\":\"鼠标和键盘操作时获得合适支撑，同时保持指向、拖动与切换顺畅。\",\"conclusion\":\"用户首先购买输入舒适性。传感不能以牺牲鼠标操作为代价，现有掌托是必要比较基线。\",\"advantage\":\"潜在差异：在不影响操作的前提下提供有用的受力信息与反馈。\",\"cost\":\"代价：体积、摩擦、左右手及手型适配、供电和标定。\",\"comparison\":\"同一键鼠任务比较普通护腕垫、滑动掌托与候选鼠托，记录操作失败、重新摆位及舒适主观反馈。\",\"china\":\"先核对国内绿联等护腕垫的确切型号与配置，再比较实际到手价；不套用印度站价格。\",\"overseas\":\"Carpio是形态参照，Lift是改变鼠标握姿的替代方案；两者不能按功能数量直接打分。\",\"question\":\"鼠托是否随手滑动、是否包含输入功能、左右手和尺寸范围怎样定义？\",\"sids\":[\"S01\",\"S24\",\"S25\",\"S54\",\"S55\"]},{\"id\":\"back\",\"label\":\"主动升展靠背\",\"short\":\"靠背\",\"plan\":\"背／座接触压力感知、电机调节与自锁\",\"task\":\"在现有椅子上获得合适支撑，工作中的支撑与休息时的按摩分别比较。\",\"conclusion\":\"先证明外挂适配与主动调节的价值。普通腰撑和按摩靠垫都应放在整椅之前研究。\",\"advantage\":\"潜在差异：沿用现有椅获得可感知的主动支撑，并减少手动调整。\",\"cost\":\"代价：厚度占用座深、固定稳定性、噪声、重量、供电及故障卸载。\",\"comparison\":\"在明确支持的椅型上，对比普通腰撑、手动调节与自动调节；记录安装、干扰、舒适及退出过程。\",\"china\":\"先匹配朋友所发YOTOK具体款和米家腰背SKU；按摩能力不能替代对主动支撑价值的验证。\",\"overseas\":\"先看Snailax、COMFIER等可加装产品；HBADA、LiberNovo、Backrobo整椅保留为技术参照。\",\"question\":\"适配哪些椅型？“便携”对应怎样的携带与安装目标？停止后如何解除受力？\",\"sids\":[\"S01\",\"S18\",\"S21\",\"S46\",\"S12\",\"S13\",\"S36\"]},{\"id\":\"neck\",\"label\":\"舒颈贴\",\"short\":\"舒颈\",\"plan\":\"贴合感知、分区温热\",\"task\":\"在转头、打字等动作中，维持合适贴合与温热体验。\",\"conclusion\":\"揉捏、电脉冲和温热应分别记录。舒颈贴需要说明贴合和使用便利，而非把所有按摩功能合并比较。\",\"advantage\":\"潜在差异：贴合稳定、热感均匀，且不影响办公动作。\",\"cost\":\"代价：皮肤接触、固定与清洁、温度控制、衣物及头发影响。\",\"comparison\":\"比较相同使用任务下的温热舒适、移位、操作负担与清洁；人体试用前先完成相应工程评估。\",\"china\":\"米家肩颈按摩仪提供揉捏加热的替代；2025年首发价只作历史价格参照。\",\"overseas\":\"SKG和Breo按确切型号核对能量方式与供电；官网冲突保留，不据宣传选电路。\",\"question\":\"怎样固定、与皮肤怎样接触、温热范围和分区由什么控制？当前不加入BP未定的电刺激。\",\"sids\":[\"S01\",\"S26\",\"S27\",\"S56\"]}],\"brief\":[{\"信息层级\":\"团队已明确\",\"内容\":\"产品形态是便携配件；先理解定位，把BP五类产品的竞品查清，再讨论优势。\",\"不要误读为\":\"要求现在独立完成整椅研发，或已确定你的正式岗位。\"},{\"信息层级\":\"BP当前规划\",\"内容\":\"手触摸式、佩戴式、人体工学鼠托、主动升展靠背、舒颈贴，按需组合。\",\"不要误读为\":\"五型已经量产，或所有功能和结构已经冻结。\"},{\"信息层级\":\"研究建议\",\"内容\":\"按每类购买任务，先看便携配件与低复杂度替代，再看整椅和跨品类案例。\",\"不要误读为\":\"团队已经确定靠背优先首发或同意某个定价。\"},{\"信息层级\":\"仍需团队确认\",\"内容\":\"最新图和功能边界、首发次序、支持场景、成本目标、个人协作职责。\",\"不要误读为\":\"公开资料能代替团队作出这些决定。\"}],\"tasks\":[{\"顺序\":1,\"要做的事\":\"用自己的话说明项目\",\"交付物\":\"1页：用户、场景、五型功能、便携形态、已知与待确认\",\"完成标准\":\"朋友能指出具体哪里理解不一致，而不是只评价文案。\"},{\"顺序\":2,\"要做的事\":\"五类竞品用相同字段比较\",\"交付物\":\"五类竞品对照及来源；核实型号与价格缺口\",\"完成标准\":\"每类都有中国和海外参照，并解释为什么可比。\"},{\"顺序\":3,\"要做的事\":\"从对比提出候选差异\",\"交付物\":\"每类一个候选购买理由、一个代价、一个需要验证的问题\",\"完成标准\":\"不把品牌宣传或BP规划写成已经领先。\"},{\"顺序\":4,\"要做的事\":\"让团队收敛首发配置\",\"交付物\":\"最新版功能表、首发排序、成本目标与责任边界\",\"完成标准\":\"记录由谁确认、用哪个版本；方案由团队确认。\"},{\"顺序\":5,\"要做的事\":\"PCB工具并行入门\",\"交付物\":\"在示例工程完成打开、读取、修改与检查流程的练习记录\",\"完成标准\":\"能在指导下操作；产品电路与安全判断由相应负责人复核。\"}],\"questions\":[{\"问题\":\"最新版BP和产品图是哪一版？\",\"影响\":\"防止对着过期功能选竞品。\"},{\"问题\":\"五类里哪些先做、哪些是长期规划？\",\"影响\":\"由团队确定首发顺序；品类展示顺序不代表优先级。\"},{\"问题\":\"每类第一批用户与最主要场景是什么？\",\"影响\":\"先确定比较任务，再评价功能优劣。\"},{\"问题\":\"“便携”要做到怎样的携带、安装与适配？\",\"影响\":\"需要具体可测要求，不能只写轻便。\"},{\"问题\":\"1499元平均硬件客单由哪些配置构成？\",\"影响\":\"不将客单模型错写成五件套价格。\"},{\"问题\":\"你希望我负责调研到什么程度，PCB配合到哪一步？\",\"影响\":\"明确交付、复核人和协作边界。\"}],\"advantages\":[{\"潜在优势\":\"便携配件，沿用现有工作位\",\"可能给用户的好处\":\"减少更换整椅或固定设备的负担\",\"相应代价\":\"安装、厚度、稳定、重量与供电\",\"需要的证据\":\"目标椅型与动作下的实际使用和携带表现\"},{\"潜在优势\":\"五类按需组合\",\"可能给用户的好处\":\"按需求选购；若协同有效，可减少分散操作\",\"相应代价\":\"配对、充电、库存、清洁和售后复杂度\",\"需要的证据\":\"单品与组合对照，确认新增价值超过新增负担\"},{\"潜在优势\":\"感知与主动反馈\",\"可能给用户的好处\":\"支撑调整或提醒更符合实际使用状态\",\"相应代价\":\"传感误差、误动作、打扰与成本\",\"需要的证据\":\"与被动、手动或简单规则比较，而非仅证明有传感器\"}],\"summary\":\"先围绕五类便携配件，把用户为什么购买讲清楚；再由团队确认首发与功能边界。\",\"scope\":\"BP五型范围不变；主动靠背仍按电机与自锁路线。中国与海外用同一套问题研究，分别保留当地价格和服务条件。\",\"cases\":[{\"title\":\"YOTOK：普通支撑的对照线索\",\"status\":\"商品尚未完整匹配\",\"fact\":\"电商目录可见相关腰撑商品，但还未确认与朋友所发链接为同一款。\",\"lesson\":\"先研究用户买它解决什么问题、实际怎样固定，再判断智能功能能增加多少价值。\",\"boundary\":\"“日本”商品标题和销售额说法均未独立核实；不放进成功案例数字。\",\"sources\":[\"S46\"]},{\"title\":\"云望RheoFit A1：学习减少操作负担\",\"status\":\"公开产品信息已核查\",\"fact\":\"品牌介绍自动滚动按摩、可换按摩套、App和速度设置。美国页面A1为USD 379。\",\"lesson\":\"学习如何把用户自己反复操作，变为更省力的使用过程；可用于梳理我们的自动化价值。\",\"boundary\":\"这是运动恢复与放松的跨品类案例，不能据此证明办公支撑需求，也不是本项目的整机设计模板。\",\"sources\":[\"S47\",\"S48\"]}]}");
const jsonValue0$1 = value$1["profiles"];const jsonValue1$1 = value$1["brief"];const jsonValue2 = value$1["tasks"];const jsonValue3 = value$1["questions"];const jsonValue4 = value$1["advantages"];const jsonValue5 = value$1["summary"];const jsonValue6 = value$1["scope"];const jsonValue7 = value$1["cases"];

var moonbird = JSON.parse("\"./assets/image.74b4f547b035746f.png\"");

const reportParts = [

  { id: 'overview', number: '01', label: '项目理解', description: '产品定义、候选优势与伙伴讨论' },

  { id: 'depth', number: '02', label: '五类竞品', description: '同品类对比与逐型号证据' },

  { id: 'research', number: '03', label: '研究底稿', description: '行业、市场、技术与来源' },

  { id: 'scenario', number: '04', label: '经营测算', description: 'BP假设与敏感性演示' }

];



const categoryIds = ['touch', 'wear', 'mouse', 'back', 'neck'];

const overviewSections = [

  ['understand', '产品定义与竞争范围'], ['products', '五类产品'], ['advantages', '优势与代价'],

  ['tasks', '决策与验证'], ['cases', '案例分析']

];

const depthSections = [

  { id: 'deep-scope', number: '1', label: '对标范围' },

  { id: 'deep-products', number: '2', label: '型号与参数' },

  { id: 'deep-features', number: '3', label: '功能打勾表' },

  { id: 'deep-sales', number: '4', label: '销量与前三' },

  { id: 'deep-prices', number: '5', label: '价格·维度·谱系' },

  { id: 'deep-reviews', number: '6', label: '购买与弃用' },

  { id: 'deep-decisions', number: '7', label: '我们的差异' },

  { id: 'deep-dossier', number: 'A', label: '安装 / 结构 / 证据', appendix: true },

  { id: 'deep-samples', number: 'B', label: '评价摘录', appendix: true },

  { id: 'deep-source-directory', number: 'C', label: '本类来源与原始证据', appendix: true }

];



// Only the heading number changes; the title, body, editable ID and source stay intact.

function numberHeading(value, number) {

  if (!number) return value;

  return value.replace(/^(#{1,3})\s+(?:(?:\d{1,2}[A-Z]?|附录[A-Z])\s*[／/｜]\s*)?/, `$1 ${number}　`);

}



function outlineFor(view, category) {

  if (view === 'overview') return overviewSections.map(([id, label], i) => ({ id: `brief-${id}`, number: `1.${i + 1}`, label }));

  if (view === 'depth') {

    const categoryNumber = categoryIds.indexOf(category) + 1;

    return depthSections.map(s => ({ ...s, number: s.appendix ? `${s.number}.${categoryNumber}` : `2.${categoryNumber}.${s.number}` }));

  }

  if (view === 'research') return value$2.sections.map((s, i) => ({ id: `section-${s.id}`, number: i < 23 ? `3.${i + 1}` : `附录${String.fromCharCode(65 + i - 23)}`, label: s.title.replace(/^(?:\d+|附录[A-Z])｜/, ''), appendix: i >= 23 }));

  return [{ id: 'scenario-intro', number: '4.1', label: '经营假设' }, { id: 'scenario-results', number: '4.2', label: '三年模型收益' }, { id: 'scenario-method', number: '4.3', label: '计算方法与边界' }];

}



function ReportNavigation({ view, category, onNavigate }) {

  const sections = outlineFor(view, category);

  const [active, setActive] = react.useState('');

  const mobile = react.useRef(null);

  react.useEffect(() => {

    const update = () => {

      const nodes = sections.map(s => document.getElementById(s.id)).filter(Boolean);

      const reached = nodes.filter(el => el.getBoundingClientRect().top <= 180);

      setActive((reached.at(-1) || nodes[0])?.id || '');

    };

    update();

    window.addEventListener('scroll', update, { passive: true });

    return () => window.removeEventListener('scroll', update);

  }, [view, category]);

  const navigate = (next, target) => {

    if (mobile.current) mobile.current.open = false;

    onNavigate(next, target);

  };

  const contents = jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    jsxRuntime.jsx('p', { className: "report-index-label", children: "阅读目录"})
    , jsxRuntime.jsx('nav', { 'aria-label': "报告总目录", className: "report-part-list", children: reportParts.map(part => jsxRuntime.jsxs('button', { type: "button", 'aria-current': part.id === view ? 'page' : undefined, onClick: () => navigate(part.id), children: [jsxRuntime.jsx('span', { children: part.number}), jsxRuntime.jsx('strong', { children: part.label})]}, part.id))})
    , jsxRuntime.jsx('p', { className: "report-index-label report-index-local" , children: "本部分目录"})
    , jsxRuntime.jsx('nav', { 'aria-label': "本部分目录", className: "report-section-list", children: sections.map((section, index) => jsxRuntime.jsxs('a', { href: `#${section.id}`, className: section.appendix && !sections[index - 1]?.appendix ? 'appendix-start' : undefined, 'aria-current': active === section.id ? 'location' : undefined, onClick: event => { event.preventDefault(); navigate(view, section.id); }, children: [jsxRuntime.jsx('span', { children: section.number}), jsxRuntime.jsx('span', { children: section.label})]}, section.id))})
  ]});

  return jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    jsxRuntime.jsx('aside', { className: "report-index-desktop", children: contents})
    , jsxRuntime.jsxs('details', { ref: mobile, className: "report-index-mobile", children: [jsxRuntime.jsxs('summary', { children: ["目录", jsxRuntime.jsx('span', { children: reportParts.find(p => p.id === view).label}), jsxRuntime.jsx('b', { 'aria-hidden': "true", children: "⌄"})]}), jsxRuntime.jsx('div', { className: "report-index-mobile-body", children: contents})]})
  ]});

}

const sources$2 = Object.fromEntries(value$2.sources.map(source => [source.id, source]));

const briefOrder = ['understand', 'products', 'advantages', 'tasks', 'cases'];



function Copy$1({ id, children }) {

  const numbers = { hero: '1.1', 'products-title': '1.2', 'advantages-title': '1.3', 'tasks-title': '1.4', 'cases-title': '1.5' };

  return jsxRuntime.jsx(dataApp.RichNarrative, { className: "report-prose", id: `v3:${id}:copy`, value: numberHeading(children, numbers[id]), sourcePreviews: value$2.sourcePreviews,} );

}



function SourceLinks$1({ ids }) {

  return jsxRuntime.jsx('div', { className: "partner-source-links", children: ids.map(id => sources$2[id]?.url ? jsxRuntime.jsxs('a', { href: sources$2[id].url, target: "_blank", rel: "noopener noreferrer" , title: sources$2[id].title, children: [id, " · "  , sources$2[id].kind, " ↗" ]}, id) : null)});

}



function PartnerBrief({ onCategory, onResearch, onScenario }) {

  const { snapshot } = dataApp.useDataApp();

  const query = id => snapshot.queries[id].rows;

  const blocks = {

    understand: jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      jsxRuntime.jsxs('div', { className: "partner-hero", children: [
        jsxRuntime.jsx('span', { className: "partner-kicker", children: "产品定位与竞争研究"})
        , jsxRuntime.jsx(Copy$1, { id: "hero", children: `## 产品定义与竞争范围



**产品形态：便携配件。组合方式：五类终端按需选配。研究重点：用户需求、竞品与差异化。**



围绕目标用户、使用场景与现有替代方案，评估产品的新增价值。首发次序、功能范围与工程规格仍待团队确认。`})
      ]})
      , jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: "v3-brief-levels", queryId: "v3_brief", kind: "figure", title: "四种信息，要分开读", displayRows: query('v3_brief'), sourceRows: query('v3_brief'), variant: "plain", children: 
        jsxRuntime.jsx('div', { className: "partner-levels", 'data-reviewed-rows': true, children: query('v3_brief').map((row, i) => jsxRuntime.jsxs('section', { className: `partner-level level-${i}`, children: [jsxRuntime.jsx('span', { children: row.信息层级}), jsxRuntime.jsx('p', { children: row.内容})]}, row.信息层级))})
      })
      , jsxRuntime.jsx(Copy$1, { id: "reading-rule", children: "**研究用途：** 支持产品定义、竞品选择与方案取舍。公开参数用于建立比较基线，持续使用意愿和真实支付意愿仍需验证。" })
    ]}),

    products: jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      jsxRuntime.jsx(Copy$1, { id: "products-title", children: `## 01 / 五类产品，各自解决什么问题



下图来自BP第7页，属于产品概念。点击下方终端，查看同一套字段下的中国与海外对照。`})
      , jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: "v3-product-scope", queryId: "v3_profiles", kind: "figure", title: "五类按需组合 · BP规划"  , displayRows: query('v3_profiles'), sourceRows: query('v3_profiles'), variant: "plain", children: 
        jsxRuntime.jsxs('div', { 'data-reviewed-rows': true, children: [
          jsxRuntime.jsxs('figure', { className: "partner-bp", children: [jsxRuntime.jsx('img', { src: bp, alt: "BP中的五类终端概念图：手触摸式、佩戴式、人体工学鼠托、主动升展靠背、舒颈贴",} ), jsxRuntime.jsx('figcaption', { children: "BP概念图，外观与功能仍可能更新；不代表已完成样机或量产。"})]})
          , jsxRuntime.jsx('div', { className: "partner-terminal-grid", children: query('v3_profiles').map((row, i) => jsxRuntime.jsxs('button', { type: "button", onClick: () => onCategory(row.id), 'aria-label': `查看${row.label}竞品`, children: [jsxRuntime.jsxs('span', { className: "partner-terminal-number", children: ["0", i + 1]}), jsxRuntime.jsx('strong', { children: row.label}), jsxRuntime.jsx('span', { children: row.plan}), jsxRuntime.jsx('em', { children: "查看中外对照 →" })]}, row.id))})
          , jsxRuntime.jsxs('div', { className: "partner-system", children: [jsxRuntime.jsx('strong', { children: "统一能力与控制协议"}), jsxRuntime.jsx('span', { children: "云端受限计划 → App授权与操作 → 终端执行与独立保护"    })]})
        ]})
      })
      , jsxRuntime.jsx(Copy$1, { id: "scope-note", children: "**模块化**指五类终端按需组合，当前不能解释为任意拆装椅子部件。主动靠背沿用BP的**电机与自锁**路线；佩戴位置尚待定义；舒颈贴按贴合感知与分区温热研究。"})
    ]}),

    advantages: jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      jsxRuntime.jsx(Copy$1, { id: "advantages-title", children: `## 02 / 我们可能有什么优势，代价又是什么



以下是需要验证的候选优势。现有材料还不足以把它们写成“已领先竞品”。`})
      , jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: "v3-advantage-tradeoffs", queryId: "v3_advantages", kind: "figure", title: "三个候选优势，都配一个验证要求", displayRows: query('v3_advantages'), sourceRows: query('v3_advantages'), variant: "plain", children: 
        jsxRuntime.jsx('div', { className: "partner-advantages", 'data-reviewed-rows': true, children: query('v3_advantages').map(row => jsxRuntime.jsxs('section', { children: [jsxRuntime.jsx('h3', { children: row.潜在优势}), jsxRuntime.jsxs('dl', { children: [jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "可能的好处"}), jsxRuntime.jsx('dd', { children: row.可能给用户的好处})]}), jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "相应代价"}), jsxRuntime.jsx('dd', { children: row.相应代价})]}), jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "需要证明"}), jsxRuntime.jsx('dd', { children: row.需要的证据})]})]})]}, row.潜在优势))})
      })
      , jsxRuntime.jsx(dataApp.Button, { onClick: () => onResearch('positioning'), children: "展开定位与竞争分析 →" })
    ]}),

    tasks: jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      jsxRuntime.jsx(Copy$1, { id: "tasks-title", children: "## 03 / 项目决策与验证重点\n\n**决策顺序：① 产品定义 → ② 同类比较 → ③ 差异化证据 → ④ 首发与验证方案。** "})
      , jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: "v3-delivery-steps", queryId: "v3_tasks", kind: "figure", title: "研究问题与验证要求", displayRows: query('v3_tasks'), sourceRows: query('v3_tasks'), variant: "plain", children: 
        jsxRuntime.jsx('ol', { className: "partner-tasks", 'data-reviewed-rows': true, children: query('v3_tasks').map(row => jsxRuntime.jsxs('li', { children: [jsxRuntime.jsx('span', { children: String(row.顺序).padStart(2, '0')}), jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('h3', { children: row.要做的事}), jsxRuntime.jsx('p', { children: row.交付物}), jsxRuntime.jsxs('small', { children: ["完成标准：", row.完成标准]})]})]}, row.顺序))})
      })
      , jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: "v3-team-questions", queryId: "v3_questions", kind: "figure", title: "六项关键决策", displayRows: query('v3_questions'), sourceRows: query('v3_questions'), variant: "plain", children: 
        jsxRuntime.jsx('div', { className: "partner-questions", 'data-reviewed-rows': true, children: query('v3_questions').map((row, i) => jsxRuntime.jsxs('section', { children: [jsxRuntime.jsxs('span', { children: ["0", i + 1]}), jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('h3', { children: row.问题}), jsxRuntime.jsx('p', { children: row.影响})]})]}, row.问题))})
      })
    ]}),

    cases: jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      jsxRuntime.jsx(Copy$1, { id: "cases-title", children: "## 04 / 两个案例分析\n\n一个帮助建立普通支撑的比较基线，一个帮助理解减少操作负担的产品价值。两者承担不同的研究用途。"})
      , jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: "v3-case-lessons", queryId: "v3_cases", kind: "figure", title: "YOTOK与云望RheoFit A1：事实、启示、边界" , displayRows: query('v3_cases'), sourceRows: query('v3_cases'), variant: "plain", children: 
        jsxRuntime.jsx('div', { className: "partner-cases", 'data-reviewed-rows': true, children: query('v3_cases').map((row, i) => jsxRuntime.jsxs('section', { children: [jsxRuntime.jsx('span', { className: "partner-tag", children: row.status}), jsxRuntime.jsx('h3', { children: row.title}), jsxRuntime.jsxs('dl', { children: [jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "查到什么"}), jsxRuntime.jsx('dd', { children: row.fact})]}), jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "研究启示"}), jsxRuntime.jsx('dd', { children: row.lesson})]}), jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "证据边界"}), jsxRuntime.jsx('dd', { children: row.boundary})]})]}), jsxRuntime.jsx(SourceLinks$1, { ids: value$1.cases[i].sources,} )]}, row.title))})
      })
      , jsxRuntime.jsxs('div', { className: "partner-next-links", children: [jsxRuntime.jsx(dataApp.Button, { onClick: () => onResearch('method'), children: "查看研究方法与来源 →" }), jsxRuntime.jsx(dataApp.Button, { onClick: onScenario, children: "查看BP经营测算 →" })]})
      , jsxRuntime.jsx(Copy$1, { id: "closing-v5", children: "**竞品比较见“五类竞品”。** 按同品类核对具体型号、参数、排序范围与买家评价，并结合行业、渠道和经济性研究判断。销量、用户画像尚无证据的部分明确留空，访谈与样机验证仍需后续开展。" })
    ]})

  };

  return jsxRuntime.jsx('div', { className: "partner-brief", children: jsxRuntime.jsx(dataApp.SortableRegion, { id: "v3:brief", variant: "stack", className: "report-sortable-sections", authoredOrder: briefOrder.map(id => `v3:brief:${id}`), children: briefOrder.map(id => jsxRuntime.jsx(dataApp.SortableItem, { id: `v3:brief:${id}`, children: jsxRuntime.jsx('section', { id: `brief-${id}`, className: "partner-section", children: blocks[id]})}, id))})});

}



function FiveTypeResearch({ category, onCategory }) {

  const { snapshot } = dataApp.useDataApp();

  const profileQuery = `v3_profile_${category}`;

  const profile = snapshot.queries[profileQuery].rows[0];

  const queryId = `v3_comp_${category}`;

  const rows = snapshot.queries[queryId].rows;

  const sourceIds = value$1.profiles.find(row => row.id === category).sids;

  return jsxRuntime.jsxs('div', { className: "partner-research", children: [
    jsxRuntime.jsx('div', { className: "partner-category-controls", children: jsxRuntime.jsx(dataApp.SegmentedControl, { ariaLabel: "选择产品类别", value: category, onChange: onCategory, options: value$1.profiles.map(row => ({ value: row.id, label: row.short })),} )})
    , jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: `v3-profile-${category}`, queryId: profileQuery, kind: "figure", title: `${profile.label}：产品定义与研究判断`, displayRows: [profile], sourceRows: [profile], variant: "plain", children: 
      jsxRuntime.jsxs('div', { className: "partner-profile", 'data-reviewed-rows': true, children: [jsxRuntime.jsx('span', { className: "partner-kicker", children: profile.label}), jsxRuntime.jsx('h2', { children: profile.conclusion}), jsxRuntime.jsxs('div', { className: "partner-definition", children: [jsxRuntime.jsxs('section', { children: [jsxRuntime.jsx('span', { children: "BP规划"}), jsxRuntime.jsx('p', { children: profile.plan})]}), jsxRuntime.jsxs('section', { children: [jsxRuntime.jsx('span', { children: "用户需求与替代方案"}), jsxRuntime.jsx('p', { children: profile.task})]})]}), jsxRuntime.jsxs('p', { className: "partner-pending", children: [jsxRuntime.jsx('strong', { children: "先向团队确认："}), profile.question]})]})
    })
    , jsxRuntime.jsx(Copy$1, { id: `${category}:comparison-intro`, children: `### 先看这三条对照



“近功能”表示功能或形态接近；“任务替代”表示用户可能用它完成同一件事。价格保留地区、币种和日期，未知项留空不等于没有。`})
    , jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: `v3-comparisons-${category}`, queryId: queryId, kind: "figure", title: `${profile.label} · 同字段对照`, displayRows: rows, sourceRows: rows, variant: "plain", children: 
      jsxRuntime.jsx('div', { className: "partner-comparisons", 'data-reviewed-rows': true, children: rows.map(row => jsxRuntime.jsxs('section', { className: "partner-competitor-card", children: [jsxRuntime.jsx('span', { className: "partner-market", children: row.市场}), jsxRuntime.jsx('h3', { children: row.产品}), jsxRuntime.jsx('p', { className: "partner-relation", children: row.对照关系}), jsxRuntime.jsxs('div', { className: "partner-price", children: [jsxRuntime.jsx('span', { children: "价格与日期"}), jsxRuntime.jsx('strong', { children: row.价格与日期})]}), jsxRuntime.jsxs('dl', { children: [jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "公开资料确认"}), jsxRuntime.jsx('dd', { children: row.公开资料确认})]}), jsxRuntime.jsxs('div', { className: "partner-judgment", children: [jsxRuntime.jsx('dt', { children: "对我们的启示 · 研究判断"  }), jsxRuntime.jsx('dd', { children: row['对我们的启示（判断）']})]}), jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "用户反馈证据"}), jsxRuntime.jsx('dd', { children: row.用户反馈证据})]}), jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "仍待核实"}), jsxRuntime.jsx('dd', { children: row.仍待核实})]})]}), jsxRuntime.jsx(SourceLinks$1, { ids: row.来源编号.match(/S\d+/g) || [],} )]}, row.产品))})
    })
    , category === 'touch' && jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: "v3-moonbird-photo", queryId: "v3_comp_touch", kind: "figure", title: "手持引导产品的实际形态参照", displayRows: [rows[0]], sourceRows: [rows[0]], variant: "plain", children: jsxRuntime.jsxs('figure', { className: "partner-product-photo", 'data-reviewed-rows': true, children: [jsxRuntime.jsx('a', { href: sources$2.S49.url, target: "_blank", rel: "noopener noreferrer" , children: jsxRuntime.jsx('img', { src: moonbird, alt: "Moonbird品牌使用场景图：坐姿用户手持小型设备，另一手拿手机",} )}), jsxRuntime.jsxs('figcaption', { children: [jsxRuntime.jsx('strong', { children: "Moonbird官方使用场景图"}), jsxRuntime.jsx('p', { children: "用于理解手持设备与App的交互形态，非本项目样机，也不构成效果验证。"}), jsxRuntime.jsx(SourceLinks$1, { ids: ['S49'],} )]})]})})
    , jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: `v3-conclusions-${category}`, queryId: profileQuery, kind: "figure", title: `${profile.label} · 下一步如何研究`, displayRows: [profile], sourceRows: [profile], variant: "plain", children: 
      jsxRuntime.jsxs('div', { className: "partner-category-findings", 'data-reviewed-rows': true, children: [jsxRuntime.jsxs('div', { className: "partner-hypothesis", children: [jsxRuntime.jsx('h3', { children: "从对照走向自己的产品判断"}), jsxRuntime.jsxs('dl', { children: [jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "候选差异"}), jsxRuntime.jsx('dd', { children: profile.advantage})]}), jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "相应代价"}), jsxRuntime.jsx('dd', { children: profile.cost})]}), jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "建议的比较方法"}), jsxRuntime.jsx('dd', { children: profile.comparison})]})]})]}), jsxRuntime.jsxs('div', { className: "partner-region-grid", children: [jsxRuntime.jsxs('section', { children: [jsxRuntime.jsx('span', { className: "partner-kicker", children: "中国市场"}), jsxRuntime.jsx('p', { children: profile.china})]}), jsxRuntime.jsxs('section', { children: [jsxRuntime.jsx('span', { className: "partner-kicker", children: "海外市场"}), jsxRuntime.jsx('p', { children: profile.overseas})]})]}), jsxRuntime.jsx(SourceLinks$1, { ids: sourceIds,} )]})
    })
  ]});

}

function calculateScenario(price, manufacturing, variable) {
  const contribution = price - manufacturing - variable;
  const years = [1000, 3000, 8000].map((buyers, index) => {
    const paidYears = [50, 300, 1200][index];
    const fixed = [1200000, 1800000, 3000000][index];
    const result = buyers * contribution + paidYears * 199 * 0.8 - fixed;
    return { 年度: `第${index + 1}年`, '模型收益（万元）': result / 10000,
      硬件购买者: buyers, 付费用户年: paidYears, 固定费用: fixed,
      平均硬件净客单: price, 制造成本: manufacturing, 其他变动成本: variable };
  });
  return { contribution, rate: contribution / price,
    breakeven: contribution > 0 ? Math.max(0, Math.ceil((1200000 - 50 * 199 * 0.8) / contribution)) : null,
    years, cumulative: years.reduce((total, year) => total + year['模型收益（万元）'], 0) };
}

const yuan = value => new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 0 }).format(value);
const wan = value => new Intl.NumberFormat('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

function ScenarioView() {

  const { snapshot } = dataApp.useDataApp();

  const base = snapshot.queries.v2_scenario.rows[0];

  const [price, setPrice] = react.useState(base.平均硬件净客单);

  const [manufacturing, setManufacturing] = react.useState(base.制造成本);

  const [variable, setVariable] = react.useState(base.其他变动成本);

  const result = calculateScenario(price, manufacturing, variable);

  const preset = (manufacturingChange, variableChange) => {

    setPrice(base.平均硬件净客单); setManufacturing(base.制造成本 + manufacturingChange); setVariable(base.其他变动成本 + variableChange);

  };

  const scenarioRows = [{ ...base, 平均硬件净客单: price, 制造成本: manufacturing, 其他变动成本: variable,

    单客贡献: result.contribution, 贡献率: result.rate, 首年盈亏平衡购买者: result.breakeven,

    三年累计模型收益万元: result.cumulative, 假设性质: '读者情景；恢复按钮返回BP基线',

    BP基线客单: base.平均硬件净客单, BP基线制造: base.制造成本, BP基线其他: base.其他变动成本 }];

  return jsxRuntime.jsxs('div', { className: "investor-scenario", children: [
    jsxRuntime.jsxs('section', { id: "scenario-intro", children: [jsxRuntime.jsx('span', { className: "report-section-number", children: "4.1"})
    , jsxRuntime.jsx(dataApp.RichNarrative, { className: "report-prose", id: "v2:scenario-intro", value: '## 改一个假设，看经营结论是否还站得住\n\n这里调整的是研究情景，**不会改动BP原始数据**。销量仍固定为1000／3000／8000名硬件购买者，不代表售价变化后销量也能保持。金额为人民币。',} )
    , jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: "v2-scenario-controls", queryId: "v2_scenario", kind: "figure", title: "可调假设与即时结果", displayRows: scenarioRows, sourceRows: scenarioRows, variant: "plain", children: 
      jsxRuntime.jsxs('div', { className: "investor-scenario-layout", 'data-reviewed-rows': true, children: [
        jsxRuntime.jsxs('div', { className: "investor-controls", children: [
          jsxRuntime.jsx(dataApp.Slider, { label: "平均硬件净客单（元）", min: 999, max: 2199, step: 50, value: price, onChange: setPrice, showBounds: true, formatValue: yuan,} )
          , jsxRuntime.jsx(dataApp.Slider, { label: "制造成本／客（元）", min: 450, max: 1250, step: 50, value: manufacturing, onChange: setManufacturing, showBounds: true, formatValue: yuan,} )
          , jsxRuntime.jsx(dataApp.Slider, { label: "其他变动成本／客（元）", min: 80, max: 580, step: 20, value: variable, onChange: setVariable, showBounds: true, formatValue: yuan,} )
          , jsxRuntime.jsxs('div', { className: "investor-presets", children: [jsxRuntime.jsx(dataApp.Button, { onClick: () => preset(0, 0), children: "恢复BP基线"}), jsxRuntime.jsx(dataApp.Button, { onClick: () => preset(100, 0), children: "制造＋100元"}), jsxRuntime.jsx(dataApp.Button, { onClick: () => preset(100, 100), children: "两项各＋100元"})]})
        ]})
        , jsxRuntime.jsxs('div', { className: "investor-scenario-results", 'aria-live': "polite", children: [
          jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('span', { children: "硬件单客贡献"}), jsxRuntime.jsxs('strong', { 'data-scenario': "contribution", className: result.contribution < 0 ? 'is-negative' : '', children: [yuan(result.contribution), jsxRuntime.jsx('small', { children: "元"})]}), jsxRuntime.jsxs('p', { children: ["贡献率 " , (result.rate * 100).toFixed(1), "%"]})]})
          , jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('span', { children: "首年盈亏平衡购买者"}), jsxRuntime.jsxs('strong', { 'data-scenario': "breakeven", children: [result.breakeven === null ? '不适用' : yuan(result.breakeven), jsxRuntime.jsx('small', { children: result.breakeven === null ? '' : '名'})]}), jsxRuntime.jsx('p', { children: result.breakeven === null ? '贡献≤0，增加销量无法覆盖固定费' : '含50付费用户年的服务贡献'})]})
          , jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('span', { children: "三年累计模型收益"}), jsxRuntime.jsxs('strong', { 'data-scenario': "cumulative", className: result.cumulative < 0 ? 'is-negative' : '', children: [wan(result.cumulative), jsxRuntime.jsx('small', { children: "万元"})]}), jsxRuntime.jsx('p', { children: "未计入完整资本开支与现金占用"})]})
        ]})
      ]})
    })
    ]})
    , jsxRuntime.jsxs('section', { id: "scenario-results", className: "scenario-subsection", children: [jsxRuntime.jsx('span', { className: "report-section-number", children: "4.2"})
    , jsxRuntime.jsx(dataApp.EvidenceChart, { id: "v2-scenario-years", queryId: "v2_scenario", title: "当前假设下的三年模型收益", rows: result.years, sourceRows: result.years, height: 350, spec: { type: 'bar', x: '年度', y: '模型收益（万元）', yLabel: '人民币万元', showValues: true, valueDecimals: 2, colors: { '模型收益（万元）': 'var(--chart-1)' } }, description: "固定销量、付费用户年与固定费，只调整平均硬件客单及两项单客成本。数据预览展示当前输入与计算行；恢复BP基线按钮可回到原始假设。",} )
    , jsxRuntime.jsx('div', { className: "investor-year-readout", 'data-reviewed-rows': true, children: result.years.map(row => jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('span', { children: row.年度}), jsxRuntime.jsxs('strong', { className: row['模型收益（万元）'] < 0 ? 'is-negative' : '', children: [wan(row['模型收益（万元）']), " 万元" ]})]}, row.年度))})
    ]})
    , jsxRuntime.jsxs('section', { id: "scenario-method", className: "scenario-subsection", children: [jsxRuntime.jsx('span', { className: "report-section-number", children: "4.3"})
    , jsxRuntime.jsx(dataApp.RichNarrative, { className: "report-prose", id: "v2:scenario-method", value: '**怎么算：** 硬件贡献＝净客单－制造成本－其他变动成本。年度模型收益＝购买者×硬件贡献＋付费用户年×199×80%－固定费。首年固定费120万元，第二年180万元，第三年300万元；付费用户年分别为50／300／1200。\n\n**成本核查重点：** 将其他变动成本拆成渠道、支付、配送、获客、退货整备和保修；逐项用报价或记录替换假设，避免漏计或重复扣减。税口径应保持一致。\n\n**使用边界：** 这是经营敏感性演示，不是净利润、现金流或销量预测；没有模拟价格弹性、良率、账期和退货率之间的联动。',} )
    ]})
  ]});

}

const value = JSON.parse("{\"sources\":[{\"id\":\"BP\",\"title\":\"用户BP，第7—11页\",\"url\":\"#bp-scope\",\"kind\":\"用户资料\",\"scope\":\"五类设备为规划，尚未冻结尺寸、容量、精度及量产规格。\",\"files\":[\"../../bp_review/slides.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-MOON\",\"title\":\"Moonbird 官网\",\"url\":\"https://www.moonbird.life/products/moonbird\",\"kind\":\"官网\",\"scope\":\"美国报价；磁吸充电线由QVC商品页交叉核对。\",\"files\":[\"primary-specs-a.json\",\"primary-more.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-REF\",\"title\":\"Reflect Orb 官网\",\"url\":\"https://www.meetreflect.com/shop/\",\"kind\":\"官网\",\"scope\":\"EDA/ECG、光反馈；软振动为计时提示，不等同于膨胀握持引导。\",\"files\":[\"primary-specs-a.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-CORE\",\"title\":\"Hyperice Core Premium\",\"url\":\"https://get.hyperice.com/core-premium\",\"kind\":\"官网\",\"scope\":\"169美元活动含12个月Premium；不把促销价和标准价混算。\",\"files\":[\"primary-specs-a.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-CORE-R\",\"title\":\"Core Premium 品牌转载评论\",\"url\":\"https://bestbuy.ugc.bazaarvoice.com/3545syn/6477992/syndicatedreviews.htm?sourcename=hyperice\",\"kind\":\"品牌转载评论\",\"scope\":\"页面51条中读取第1页8条；含促销与ExpertVoice评论。\",\"files\":[\"core-reviews-web.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-UGR\",\"title\":\"绿联 LP668 天猫商品与评论\",\"url\":\"https://detail.tmall.com/item.htm?id=719666513106\",\"kind\":\"登录后买家评论\",\"scope\":\"169条去重鼠标垫记录；剔除键盘托；7000+是父商品全部评价，98.2%是平台近3个月口径。\",\"files\":[\"ugreen-product-dom.json\",\"ugreen-default-reviews.json\",\"ugreen-followup-reviews.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-UPR\",\"title\":\"UPRIGHT GO2 / Pro Kit Loox评论\",\"url\":\"https://www.loox.io/s/oKpU1DCpJY?page=2\",\"kind\":\"平台标记Verified\",\"scope\":\"35条卡片中27条归属GO2/Pro Kit；无日期，部分长评截断。\",\"files\":[\"upright-loox-dom.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-HP-C\",\"title\":\"HiPee P1 儿童款京东商品\",\"url\":\"https://item.jd.com/10070762213072.html\",\"kind\":\"京东买家预览\",\"scope\":\"现价79元；P1儿童款；3条精选评价无日期/所购SKU。全部评价入口维修。\",\"files\":[\"jd-hipee-state.json\",\"jd-hipee-drawer.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-MOR-R\",\"title\":\"Morfit Electric 商品页评论\",\"url\":\"https://morfitusa.com/products/morfit-electric-adjustable-lumbar-support\",\"kind\":\"商店邀请/Shop评论\",\"scope\":\"六个分页共27条唯一记录，保留24条；剔除两条仅商品名与一条门店人员评价。包含商店邀请、访客和转载评价，非随机样本。\",\"files\":[\"morfit-review-exact.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-WOOT\",\"title\":\"Woot 转载 Amazon 颈带评论\",\"url\":\"https://www.woot.com/review/B0D818Z9CZ?filter=1&itemid=AC227056A&offerid=d6c33d20-718d-4471-886b-5451b189988b\",\"kind\":\"Verified Purchase评论\",\"scope\":\"1星Top10条＋5星近期10条；样本按星级定向抽取，不能由10:10推断好评率。\",\"files\":[\"woot-neck-dom.json\",\"woot-neck-positive.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-HIPEE\",\"title\":\"HiPee 成人智能矫姿精灵（黑/红）\",\"url\":\"https://item.taobao.com/item.htm?id=637744969078\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[\"hipee-search-cards.json\",\"hipee-detail.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-CATPRINCE\",\"title\":\"猫太子 智能矫姿环·豪华液晶款\",\"url\":\"https://item.taobao.com/item.htm?id=964406962223\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[\"wear-search-cards.json\",\"catprince-detail.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-GRANDKID\",\"title\":\"Grandkid A2 智能矫姿精灵\",\"url\":\"https://item.taobao.com/item.htm?id=684254726257\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[\"wear-search-cards.json\",\"wear-grandkid-detail.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-UPRIGHT2\",\"title\":\"UPRIGHT GO 2 单机\",\"url\":\"https://store.uprightpose.com/products/upright-go2\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-UPRIGHTS\",\"title\":\"UPRIGHT GO S 单机\",\"url\":\"https://store.uprightpose.com/products/upright-go-s\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-KODGEM\",\"title\":\"Kodgem Straight Plus STR-211\",\"url\":\"https://kodgemstraight.com/products/straight-plus\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-KPTE\",\"title\":\"KPTE 护腕鼠标垫·渐变系列\",\"url\":\"https://item.taobao.com/item.htm?id=904889755791\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[\"taobao-mouse-sales-sorted.json\",\"kpte-detail.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-FACTORY\",\"title\":\"天天特卖工厂 记忆棉护腕垫\",\"url\":\"https://item.taobao.com/item.htm?id=1040380970873\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[\"taobao-mouse-sales-sorted.json\",\"mouse-factory-detail.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-GUOHUO\",\"title\":\"官方国货甄选 护腕鼠标垫\",\"url\":\"https://item.taobao.com/item.htm?id=1053520190533\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[\"taobao-mouse-sales-sorted.json\",\"mouse-guohuo-detail.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-MOSISO\",\"title\":\"MOSISO Antique Green 键鼠腕托套装\",\"url\":\"https://www.amazon.com/dp/B0DCVVZ6CT\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-KTRIO\",\"title\":\"KTRIO Black 键鼠腕托套装\",\"url\":\"https://www.amazon.com/dp/B0872TX516\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-YOLANDA\",\"title\":\"排除记录：Yolanda SKK-333仅键盘托\",\"url\":\"https://www.amazon.com/dp/B09X4XYYHD\",\"kind\":\"商品/官网\",\"scope\":\"标题含Mouse，但所选SKK-333购买内容仅键盘托；已从鼠托直接对标删除。\",\"files\":[],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-CARPIO\",\"title\":\"DeltaHub Carpio 2.0 单只基础硅胶版\",\"url\":\"https://deltahub.io/products/carpio-ergonomic-wrist-rest\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-MIDO\",\"title\":\"米多腰靠小店 人体工学气动腰靠\",\"url\":\"https://item.taobao.com/item.htm?id=705192946194\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[\"back-search-cards.json\",\"back-mido-detail.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-ZUODENG\",\"title\":\"佐登耐 人体工学腰靠（含乳胶气动款）\",\"url\":\"https://item.taobao.com/item.htm?id=747550521015\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[\"back-search-cards.json\",\"back-zuodeng-detail.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-STG\",\"title\":\"STG 腰靠·经典/加厚/气动升级混款\",\"url\":\"https://item.taobao.com/item.htm?id=959148416676\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[\"back-search-cards.json\",\"back-stg-detail.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-MIJ-E\",\"title\":\"米乔电动顶托版会议发布报道\",\"url\":\"https://www.icloudnews.net/a/124078.html\",\"kind\":\"新品报道·待样机核实\",\"scope\":\"第二代双肺叶支撑；电动调整力度/位置，约10分钟循环顶托。未查到压力闭环、尺寸及供电规格。\",\"files\":[\"mijoy-electric-public.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-MIJOY\",\"title\":\"米乔 气动护脊版腰靠\",\"url\":\"https://www.minicute.com.cn/Goods/detail/article_id/364.html\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-MORFIT\",\"title\":\"Morfit Electric Adjustable Lumbar Support\",\"url\":\"https://morfitusa.com/products/morfit-electric-adjustable-lumbar-support\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-THERMAREST\",\"title\":\"Therm-a-Rest Lumbar Pillow 06438\",\"url\":\"https://cascadedesigns.com/products/lumbar-pillow\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-OPTP\",\"title\":\"OPTP McKenzie Self-Inflating AirBack 710\",\"url\":\"https://www.optp.com/products/mckenzie-self-inflating-airback/710\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-TIANBEI\",\"title\":\"庆北旗舰店 充电热敷护颈·2600mAh\",\"url\":\"https://item.taobao.com/item.htm?id=1089873063909\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[\"neck-search-cards.json\",\"neck-tianbei-detail.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-YUANQI\",\"title\":\"元气地带 智能电热护颈·三档款\",\"url\":\"https://item.taobao.com/item.htm?id=1090725850542\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[\"neck-search-cards.json\",\"neck-yuanqi-detail.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-MUJIE\",\"title\":\"MUJIE商城222 发热围巾·81×10cm\",\"url\":\"https://item.taobao.com/item.htm?id=846531050257\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[\"neck-search-cards.json\",\"neck-mujie-detail.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-RUIERFU\",\"title\":\"中科瑞尔福 充电热敷颈带\",\"url\":\"https://detail.tmall.com/item.htm?id=816213847975\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-WOOT-P\",\"title\":\"Cordless Heated Scarf · ASIN B0D818Z9CZ\",\"url\":\"https://www.woot.com/offers/neck-heating-pad-cordless-0\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-COMFHEAT\",\"title\":\"Comfheat US-180-2 无线热敷振动颈带\",\"url\":\"https://www.newegg.com/p/0JH-01C1-00458\",\"kind\":\"商品/官网\",\"scope\":\"Newegg同型号US-180-2，页面报价59.99美元；第三方卖家，非品牌直营。\",\"files\":[\"comfheat-price-web.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-SHARPER\",\"title\":\"Sharper Image Cordless Neck Heat Therapy Wrap 207905\",\"url\":\"https://sharperimage.com/products/cordless-neck-heat-therapy-wrap-by-sharper-image\",\"kind\":\"商品/官网\",\"scope\":\"同商品页取得10条唯一评论；含2016—2025年历史款，Stamped标记Verified Buyer。原有4条资料卡案例已合并，不重复计数；一条五星与负面正文冲突。\",\"files\":[],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-R-MOUSE-CN\",\"title\":\"淘宝“鼠标护腕垫”销量排序\",\"url\":\"https://s.taobao.com/search?q=%E9%BC%A0%E6%A0%87%E6%8A%A4%E8%85%95%E5%9E%AB&sort=sale-desc\",\"kind\":\"登录页面排序快照\",\"scope\":\"实际点击销量，aria-selected=true；仅保存前48条。排除广告、平面垫和得力混杂平面型号链接。\",\"files\":[\"taobao-mouse-sales-sorted.json\",\"mouse-deli-detail.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-R-BACK-CN\",\"title\":\"淘宝“气动腰靠”销量排序\",\"url\":\"https://s.taobao.com/search?q=%E6%B0%94%E5%8A%A8%E8%85%B0%E9%9D%A0&sort=sale-desc\",\"kind\":\"登录页面排序快照\",\"scope\":\"去掉广告后前3链接；全部含普通/气动子版本，不能提取气动款独立销量。\",\"files\":[\"back-search-cards.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-R-NECK-CN\",\"title\":\"淘宝“充电热敷颈带”销量排序\",\"url\":\"https://s.taobao.com/search?q=%E5%85%85%E7%94%B5%E7%83%AD%E6%95%B7%E9%A2%88%E5%B8%A6&sort=sale-desc\",\"kind\":\"登录页面排序快照\",\"scope\":\"实际销量排序；除去广告，记录首3个颈带链接。此窄关键词显示量小，不能代表整个热敷市场。\",\"files\":[\"neck-search-cards.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-R-WEAR-CN\",\"title\":\"淘宝“智能坐姿矫正器”销量排序\",\"url\":\"https://s.taobao.com/search?q=%E6%99%BA%E8%83%BD%E5%9D%90%E5%A7%BF%E7%9F%AB%E6%AD%A3%E5%99%A8&sort=sale-desc\",\"kind\":\"品类筛选留证\",\"scope\":\"结果混入桌面护栏/距离提醒器/穿戴矫姿带；不制造无法严格确认的穿戴前三。\",\"files\":[\"wear-search-cards.json\",\"hipee-search-cards.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-R-MOUSE-US\",\"title\":\"Amazon US Wrist Rests Best Sellers\",\"url\":\"https://www.amazon.com/Best-Sellers-Computer-Keyboard-Mouse-Wrist-Rests/zgbs/pc/705324011\",\"kind\":\"美国类目畅销榜\",\"scope\":\"原腕托大类#1 MOSISO / #2 KTRIO / #3 Yolanda / #4 GORILLA GRIP；核实Yolanda所选SKK-333仅键盘托后排除。筛选前三为原榜1、2、4；不是鼠标专榜。\",\"files\":[\"amazon-ranking-dom2.json\",\"amazon-yolanda-detail.json\",\"amazon-gorilla-detail.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-R-TOUCH-CN\",\"title\":\"淘宝Moonbird销量排序与手持生物反馈检索\",\"url\":\"https://s.taobao.com/search?q=moonbird&sort=sale-desc\",\"kind\":\"中国销售线索\",\"scope\":\"成人同品牌进口链接约2250/2299元、显示0人收货；另有儿童Moonbuddy和无关商品，均未充作三个不同竞品。\",\"files\":[\"moonbird-search-cards.json\",\"touch-search-cards.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-TBR-HIPEE\",\"title\":\"HiPee 成人智能矫姿精灵（黑/红）：淘宝/天猫评价\",\"url\":\"https://item.taobao.com/item.htm?id=637744969078\",\"kind\":\"商品所购评价摘录\",\"scope\":\"14条同商品记录，包含2条首评为空但追评有效的记录；初评和追评不重复计数。\",\"files\":[\"taobao-hipee-api-reviews.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-TBR-CATPRINCE\",\"title\":\"猫太子 智能矫姿环·豪华液晶款：淘宝/天猫评价\",\"url\":\"https://item.taobao.com/item.htm?id=964406962223\",\"kind\":\"商品所购评价摘录\",\"scope\":\"读取4页80条，剔除8条桌面支架组合，保留72条矫姿环所购规格；第5页超时。个别正文与佩戴形态不一致，只作待核信息，不用于功能归因。\",\"files\":[\"taobao-catprince-api-reviews.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-TBR-GRANDKID\",\"title\":\"Grandkid A2 智能矫姿精灵：淘宝/天猫评价\",\"url\":\"https://item.taobao.com/item.htm?id=684254726257\",\"kind\":\"商品所购评价摘录\",\"scope\":\"保留15条；首屏order=3，正文最多150字、规格最多40字；混款分开。不用于估算满意率。\",\"files\":[\"taobao-grandkid-api-reviews.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-TBR-KPTE\",\"title\":\"KPTE 护腕鼠标垫·渐变系列：淘宝/天猫评价\",\"url\":\"https://item.taobao.com/item.htm?id=904889755791\",\"kind\":\"商品所购评价摘录\",\"scope\":\"保留20条；首屏order=3，正文最多150字、规格最多40字；混款分开。不用于估算满意率。\",\"files\":[\"taobao-kpte-api-reviews.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-TBR-FACTORY\",\"title\":\"天天特卖工厂 记忆棉护腕垫：淘宝/天猫评价\",\"url\":\"https://item.taobao.com/item.htm?id=1040380970873\",\"kind\":\"商品所购评价摘录\",\"scope\":\"保留18条；首屏order=3，正文最多150字、规格最多40字；混款分开。不用于估算满意率。\",\"files\":[\"taobao-factory-api-reviews.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-TBR-GUOHUO\",\"title\":\"官方国货甄选 护腕鼠标垫：淘宝/天猫评价\",\"url\":\"https://item.taobao.com/item.htm?id=1053520190533\",\"kind\":\"商品所购评价摘录\",\"scope\":\"保留17条；首屏order=3，正文最多150字、规格最多40字；混款分开。不用于估算满意率。\",\"files\":[\"taobao-guohuo-api-reviews.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-TBR-MIDO\",\"title\":\"米多腰靠小店 人体工学气动腰靠：淘宝/天猫评价\",\"url\":\"https://item.taobao.com/item.htm?id=705192946194\",\"kind\":\"商品所购评价摘录\",\"scope\":\"保留20条；首屏order=3，正文最多150字、规格最多40字；混款分开。不用于估算满意率。\",\"files\":[\"taobao-miduo-api-reviews.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-TBR-ZUODENG\",\"title\":\"佐登耐 人体工学腰靠（含乳胶气动款）：淘宝/天猫评价\",\"url\":\"https://item.taobao.com/item.htm?id=747550521015\",\"kind\":\"商品所购评价摘录\",\"scope\":\"保留20条；首屏order=3，正文最多150字、规格最多40字；混款分开。不用于估算满意率。\",\"files\":[\"taobao-zuodeng-api-reviews.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-TBR-STG\",\"title\":\"STG 腰靠·经典/加厚/气动升级混款：淘宝/天猫评价\",\"url\":\"https://item.taobao.com/item.htm?id=959148416676\",\"kind\":\"商品所购评价摘录\",\"scope\":\"保留20条；首屏order=3，正文最多150字、规格最多40字；混款分开。不用于估算满意率。\",\"files\":[\"taobao-stg-api-reviews.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-TBR-MIJOY\",\"title\":\"米乔 气动护脊版腰靠：淘宝/天猫评价\",\"url\":\"https://www.minicute.com.cn/Goods/detail/article_id/364.html\",\"kind\":\"商品所购评价摘录\",\"scope\":\"保留20条；首屏order=3，正文最多150字、规格最多40字；混款分开。规格带晒单20元奖励，存在正向偏差。\",\"files\":[\"taobao-mijoy-api-reviews.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-TBR-TIANBEI\",\"title\":\"庆北旗舰店 充电热敷护颈·2600mAh：淘宝/天猫评价\",\"url\":\"https://item.taobao.com/item.htm?id=1089873063909\",\"kind\":\"商品所购评价摘录\",\"scope\":\"保留0条；首屏order=3，正文最多150字、规格最多40字；混款分开。不用于估算满意率。\",\"files\":[\"taobao-qingbei-api-reviews.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-TBR-YUANQI\",\"title\":\"元气地带 智能电热护颈·三档款：淘宝/天猫评价\",\"url\":\"https://item.taobao.com/item.htm?id=1090725850542\",\"kind\":\"商品所购评价摘录\",\"scope\":\"保留0条；首屏order=3，正文最多150字、规格最多40字；混款分开。不用于估算满意率。\",\"files\":[\"taobao-yuanqi-api-reviews.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-TBR-MUJIE\",\"title\":\"MUJIE商城222 发热围巾·81×10cm：淘宝/天猫评价\",\"url\":\"https://item.taobao.com/item.htm?id=846531050257\",\"kind\":\"商品所购评价摘录\",\"scope\":\"保留0条；首屏order=3，正文最多150字、规格最多40字；混款分开。不用于估算满意率。\",\"files\":[\"taobao-mujie-api-reviews.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-TBR-RUIERFU\",\"title\":\"中科瑞尔福 充电热敷颈带：淘宝/天猫评价\",\"url\":\"https://detail.tmall.com/item.htm?id=816213847975\",\"kind\":\"商品所购评价摘录\",\"scope\":\"保留0条；首屏order=3，正文最多150字、规格最多40字；混款分开。不用于估算满意率。\",\"files\":[\"taobao-ruierfu-api-reviews.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-GORILLA\",\"title\":\"GORILLA GRIP 两件套（Keyboard Rest + Mouse Rest）\",\"url\":\"https://www.amazon.com/dp/B08W9N38PC\",\"kind\":\"商品/官网\",\"scope\":\"参数为页面声称，未实测；型号与价格见正文。\",\"files\":[\"amazon-gorilla-detail.json\",\"amazon-ranking-dom2.json\"],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-MOON-R1\",\"title\":\"Moonbird：Trustpilot公开用户评论，第1页\",\"url\":\"https://www.trustpilot.com/review/moonbird.life\",\"kind\":\"用户自述；非订单验证\",\"scope\":\"仅采用明确提及Moonbird的记录；剔除Moonbuddy与型号不明记录。评论含赠品邀评披露；不以品牌总评分代替型号表现。浏览器验证页未通过；通过公开网页检索读取。\",\"files\":[\"moonbird-web.json\"],\"accessed\":\"2026-11-06 America/Los_Angeles\"},{\"id\":\"S-MOON-R2\",\"title\":\"Moonbird：Trustpilot公开用户评论，第2页\",\"url\":\"https://www.trustpilot.com/review/moonbird.life?page=2\",\"kind\":\"用户自述；非订单验证\",\"scope\":\"仅采用明确提及Moonbird的记录；剔除Moonbuddy与型号不明记录。评论含赠品邀评披露；不以品牌总评分代替型号表现。检索缓存页面，非实时完整列表。\",\"files\":[\"moonbird-web-page2.json\"],\"accessed\":\"2026-11-06 America/Los_Angeles\"},{\"id\":\"S-MIJIA-BACK\",\"title\":\"米家智能腰背按摩仪开售报道\",\"url\":\"https://m.ithome.com/html/1016344.htm\",\"kind\":\"新品报道·待样机核实\",\"scope\":\"首销599元、建议零售699元；450mm双导轨、4按摩头、石墨烯热敷与米家App；型号与电池参数为报道口径。\",\"files\":[],\"accessed\":\"2026-11-06（美国西岸）；中国页面当地已进入11月7日\"},{\"id\":\"S-BREO-Y3PRO\",\"title\":\"倍轻松 breo 腰部按摩器 Y3 Pro · 苏宁商品页\",\"url\":\"https://m.suning.com/product/0000000000/000000012450398286.html\",\"kind\":\"商品销售页\",\"scope\":\"页面价1188元；10W/5V/42℃/140×336×344mm为页面口径，与经销页5W冲突，以说明书为准。\",\"files\":[],\"accessed\":\"2026-11-07\"},{\"id\":\"S-OSIM-UJS\",\"title\":\"OSIM uJolly Sync Full-Back Massager · 美国官网\",\"url\":\"https://us.osim.com/collections/upper-body-massagers/products/ujolly-sync-back-massager\",\"kind\":\"商品/官网\",\"scope\":\"页面价599美元；Ashiatsu与热敷为页面宣称；页面未公布功率/尺寸规格表。\",\"files\":[],\"accessed\":\"2026-11-07\"},{\"id\":\"S-SNAILAX-256\",\"title\":\"Snailax SL-256 按摩靠垫 · 官网商品页\",\"url\":\"https://www.snailax.com/products/shiatsu-massage-cushion-with-heat-256\",\"kind\":\"商品/官网\",\"scope\":\"Basic款页面报价119.99美元；官网评论数4687条不是销量。\",\"files\":[],\"accessed\":\"2026-11-07\"},{\"id\":\"S-SNAILAX-256-MAN\",\"title\":\"SL-256 使用与保养说明书（Amazon托管PDF）\",\"url\":\"https://m.media-amazon.com/images/I/91FV7FM4+QL.pdf\",\"kind\":\"官方说明书\",\"scope\":\"SL-256型号；电源输入100–240V~50/60Hz，适配器12V=1500mA。\",\"files\":[],\"accessed\":\"2026-11-07\"},{\"id\":\"S-SNAILAX-228\",\"title\":\"Snailax SL-228 按摩靠垫 · 官网商品页\",\"url\":\"https://www.snailax.com/products/snailax-back-massager-228\",\"kind\":\"商品/官网\",\"scope\":\"常规169.99美元，读取时促销139.99美元；ZenithFlex系列SL-228。\",\"files\":[],\"accessed\":\"2026-11-07\"},{\"id\":\"S-SNAILAX-228-MAN\",\"title\":\"SL-228 使用与保养说明书（manualslib镜像）\",\"url\":\"https://www.manualslib.com/manual/4345554/Snailax-Sl-228.html\",\"kind\":\"零售商托管说明书\",\"scope\":\"SL-228技术数据：41.7×16.9×3.5英寸、6.92磅、AC100–240V、12V 1500mA、最大18W、15分钟自动关机。\",\"files\":[],\"accessed\":\"2026-11-07\"},{\"id\":\"S-SIHOO-S300\",\"title\":\"SIHOO Doro S300 人体工学椅 · 美国官网\",\"url\":\"https://www.sihoo.com/products/sihoo-doro-s300-gravity-defying-ergonomic-chair\",\"kind\":\"商品/官网\",\"scope\":\"页面价599.99美元；双动态腰托与机械调节整椅；动态支撑不必然意味着电动或传感控制。\",\"files\":[],\"accessed\":\"2026-11-07\"},{\"id\":\"S-SNAILAX-EBAY\",\"title\":\"eBay Snailax 背部按摩器 Best selling\",\"url\":\"https://www.ebay.com/t/Snailax-Back-Body-Massagers/36449/bn_7115513740\",\"kind\":\"美国类目畅销榜\",\"scope\":\"子榜SL-236 $179.99/7条、SL-256 $99.59/57条、SL-632 $45/3条；评价数为新货口径，非销量。\",\"files\":[],\"accessed\":\"2026-11-07（美国西岸）；中国页面当地已进入11月8日，部分经搜索结果读取\"},{\"id\":\"S-COMFIER-STORE\",\"title\":\"COMFIER 背部按摩器分类\",\"url\":\"https://www.comfier.com/collections/back-massager\",\"kind\":\"官网\",\"scope\":\"品牌站Best selling：2307 $229.99（售罄）、2309-APP $239.99、2606 $129.99；无售出件数。\",\"files\":[],\"accessed\":\"2026-11-07（美国西岸）；中国页面当地已进入11月8日，部分经搜索结果读取\"},{\"id\":\"S-COMFIER-2309\",\"title\":\"COMFIER 颈背按摩靠垫 2309\",\"url\":\"https://www.comfier.com/collections/back-massager/products/comfier-neck-back-massager-2309\",\"kind\":\"商品/官网\",\"scope\":\"标题2307与URL 2309冲突；揉捏/滚动/热敷/气压组合为页面宣称。\",\"files\":[],\"accessed\":\"2026-11-07（美国西岸）；中国页面当地已进入11月8日，部分经搜索结果读取\"},{\"id\":\"S-HBADA-X7\",\"title\":\"HBADA X7 智能整椅\",\"url\":\"https://hbada.com/products/hbada-x7-smart-ergonomic-chair\",\"kind\":\"商品/官网\",\"scope\":\"X7 $1169、X7 Air $999；自动腰部跟随、按摩与加热为官网宣称。\",\"files\":[],\"accessed\":\"2026-11-07（美国西岸）；中国页面当地已进入11月8日，部分经搜索结果读取\"},{\"id\":\"S-MIJIA-WAIST2\",\"title\":\"IT之家：米家智能腰部按摩仪2上架\",\"url\":\"https://www.ithome.com/1/018/769.htm\",\"kind\":\"媒体报道·搜索口径\",\"scope\":\"2026-10-28上架；建议零售499元、2026-11-04起众筹379元；腰臀按摩与热敷；与腰背按摩仪不同SKU。\",\"files\":[],\"accessed\":\"2026-11-07（美国西岸）；中国页面当地已进入11月8日，部分经搜索结果读取\"},{\"id\":\"S-SKG-G1\",\"title\":\"京东：SKG G1 三代豪华款·限定蓝礼盒\",\"url\":\"https://item.jd.com/10055821374452.html\",\"kind\":\"商品销售页\",\"scope\":\"活动到手价299元及国补信息；图中红礼盒与标题限定蓝礼盒不一致，资格/日期未核。\",\"files\":[],\"accessed\":\"2026-11-07（美国西岸）；中国页面当地已进入11月8日，部分经搜索结果读取\"},{\"id\":\"S-SKG-G7\",\"title\":\"SKG G7 PRO FOLD 官网\",\"url\":\"https://www.skg.com/products/g7-pro-fold-neck-massager\",\"kind\":\"商品/官网\",\"scope\":\"美站149.99美元；可折叠收纳、可调热敷与手机控制为页面宣称。\",\"files\":[],\"accessed\":\"2026-11-07（美国西岸）；中国页面当地已进入11月8日，部分经搜索结果读取\"},{\"id\":\"S-BREO-N1\",\"title\":\"Breo N1 Pro 美版\",\"url\":\"https://us.breo.com/products/n1-pro-neck-massager\",\"kind\":\"商品/官网\",\"scope\":\"99.99美元US Plug；插电与充电FAQ矛盾；官网显示402条评论。\",\"files\":[],\"accessed\":\"2026-11-07（美国西岸）；中国页面当地已进入11月8日，部分经搜索结果读取\"},{\"id\":\"S-MIJIA-NECK\",\"title\":\"IT之家：米家智能肩颈按摩仪开售\",\"url\":\"https://www.ithome.com/0/822/843.htm\",\"kind\":\"媒体报道·搜索口径\",\"scope\":\"2025-01首发299元、建议零售399元；揉捏、两挡热敷与米家App；历史价格事件。\",\"files\":[],\"accessed\":\"2026-11-07（美国西岸）；中国页面当地已进入11月8日，部分经搜索结果读取\"},{\"id\":\"S-HEARTMATH-PROD\",\"title\":\"HeartMath 产品目录\",\"url\":\"https://www.heartmath.com/products/\",\"kind\":\"官网\",\"scope\":\"Inner Balance Coherence Plus $249；emWave2主机当前价格与供货未确认。\",\"files\":[],\"accessed\":\"2026-11-07（美国西岸）；中国页面当地已进入11月8日，部分经搜索结果读取\"},{\"id\":\"S-HEARTMATH-KB\",\"title\":\"HeartMath 知识库：产品目录与停产说明\",\"url\":\"https://kb.heartmath.com/en/heartmath-product-catalog\",\"kind\":\"官网\",\"scope\":\"emWave2内置拇指传感器/耳夹；停产与替换说明。\",\"files\":[],\"accessed\":\"2026-11-07（美国西岸）；中国页面当地已进入11月8日，部分经搜索结果读取\"},{\"id\":\"S-UPRIGHT-LAUNCH\",\"title\":\"Wareable：UPRIGHT GO S 发布报道\",\"url\":\"https://www.wareable.com/wearable-tech/upright-go-s-posture-trainer-price-release-date-features-8455\",\"kind\":\"媒体报道·搜索口径\",\"scope\":\"GO S首发$59.99（2020/2021）；GO 2首发$99.95；传感器数、电池与离线记录差异。\",\"files\":[],\"accessed\":\"2026-11-07（美国西岸）；中国页面当地已进入11月8日，部分经搜索结果读取\"},{\"id\":\"S-BREO-FAMILY\",\"title\":\"太平洋电脑网：倍轻松 600–900元按摩器报价\",\"url\":\"https://product.pconline.com.cn/massage/breo/p9408_c9400/\",\"kind\":\"品类筛选留证\",\"scope\":\"渠道报价列表，用于Back 2/Back 3E价格带参照；不同渠道报价不一，未逐渠道核。\",\"files\":[],\"accessed\":\"2026-11-07（美国西岸）；中国页面当地已进入11月8日，部分经搜索结果读取\"},{\"id\":\"S-BREO-Y2\",\"title\":\"Yami：倍轻松 Y2 腰部按摩器\",\"url\":\"https://www.yami.com/us/zht/p/waist-massager-y2-warming-belt-waist-and-back-heat-popular-gift-choice-beige/5185009381\",\"kind\":\"商品销售页\",\"scope\":\"双气囊顶敷、物理高频震动、红光深层热灸、暖宫腰带；参数为页面宣称。\",\"files\":[],\"accessed\":\"2026-11-07（美国西岸）；中国页面当地已进入11月8日，部分经搜索结果读取\"},{\"id\":\"S-CARPIO-G2\",\"title\":\"Amazon：DELTAHUB Carpio G2.0\",\"url\":\"https://www.amazon.com/dp/B0CDH3CV6Q\",\"kind\":\"商品销售页\",\"scope\":\"$44.90–49.90按尺寸/颜色浮动；G2.0为游戏定位磁吸绑带款，与2.0基础硅胶版不同款。\",\"files\":[],\"accessed\":\"2026-11-07（美国西岸）；中国页面当地已进入11月8日，部分经搜索结果读取\"},{\"id\":\"S-OSIM-INVISIBLE\",\"title\":\"OSIM Invisible Massage Chair\",\"url\":\"https://us.osim.com/products/invisible-massage-chair\",\"kind\":\"商品/官网\",\"scope\":\"$1398两件组合=uJolly Sync背部+uPhoria Sync腿部；不能等同五型统一协议。\",\"files\":[],\"accessed\":\"2026-11-07（美国西岸）；中国页面当地已进入11月8日，部分经搜索结果读取\"},{\"id\":\"S-HEARTMATH-YOTPO\",\"title\":\"HeartMath 商店评论接口（yotpo）\",\"url\":\"https://www.heartmath.com/products/\",\"kind\":\"商店邀请/Shop评论\",\"scope\":\"yotpo评论接口全量27条；全部为商店邀请口径（无自然评论），星级不代替正文判断\",\"files\":[],\"accessed\":\"2026-11-07\"},{\"id\":\"S-SNAILAX-256-REV\",\"title\":\"Snailax SL-256 · 官网评论区（areviews）\",\"url\":\"https://www.snailax.com/products/shiatsu-massage-cushion-with-heat-256\",\"kind\":\"平台标记Verified\",\"scope\":\"官网评论区标记Verified；本次读取受会话中断影响，仅留存1条完整正文\",\"files\":[],\"accessed\":\"2026-11-07\"},{\"id\":\"S-SNAILAX-228-REV\",\"title\":\"Snailax SL-228 · 官网评论区（areviews）\",\"url\":\"https://www.snailax.com/products/snailax-back-massager-228\",\"kind\":\"平台标记Verified\",\"scope\":\"官网评论区标记Verified；11条正文全量读取，去除统计/排序/表单行\",\"files\":[],\"accessed\":\"2026-11-07\"},{\"id\":\"S-SIHOO-REV\",\"title\":\"SIHOO Doro S300 · 官网评论区（Okendo）\",\"url\":\"https://www.sihoo.com/products/sihoo-doro-s300-gravity-defying-ergonomic-chair\",\"kind\":\"平台标记Verified\",\"scope\":\"Okendo评论区前5条；页面标记Verified Buyer，日期按页面显示\",\"files\":[],\"accessed\":\"2026-11-07\"},{\"id\":\"S-CARPIO-REV\",\"title\":\"DeltaHub Carpio 2.0 · 官网评论区\",\"url\":\"https://deltahub.io/products/carpio-ergonomic-wrist-rest\",\"kind\":\"用户自述；非订单验证\",\"scope\":\"官网评论区前5条买家评论；页面未显示订单验证标记\",\"files\":[],\"accessed\":\"2026-11-07\"},{\"id\":\"S-SUNING-Y3PRO\",\"title\":\"苏宁：倍轻松 Y3 Pro 腰部按摩器（商品页）\",\"url\":\"https://m.suning.com/product/0000000000/000000012450398286.html\",\"kind\":\"商品销售页\",\"scope\":\"苏宁渠道页2026-11-07显示暂无评价；渠道登录墙未取得更多评价内容\",\"files\":[],\"accessed\":\"2026-11-07\"},{\"id\":\"S-SUNING-SKG\",\"title\":\"苏宁：SKG 颈椎按摩器 G1 豪华款（商品页）\",\"url\":\"https://m.suning.com/product/0000000000/12409779841.html\",\"kind\":\"商品销售页\",\"scope\":\"页面显示评价7.5万+、好评率99%；登录墙限制仅可见1条预览正文\",\"files\":[],\"accessed\":\"2026-11-07\"}],\"audit\":[{\"product\":\"ugreen\",\"raw\":199,\"kept\":169,\"method\":\"默认排序120条＋追评79条；按匿名账号标记＋日期＋所购规格合并重复，初评与追评不另算一人；排除键盘手托和空评价。匿名标记可能碰撞，数量是评论记录数，不是独立买家数。\",\"excludedVariantRecords\":23,\"productName\":\"绿联 LP668 记忆棉护腕鼠标垫\",\"category\":\"mouse\",\"market\":\"china\"},{\"product\":\"upright2\",\"raw\":35,\"kept\":27,\"method\":\"Loox第2页可读取卡片；仅保留GO 2和Pro Kit，剔除项链、USB线、腰枕。页面无日期，部分长评截断；Verified为平台标记。\",\"productName\":\"UPRIGHT GO 2 单机\",\"category\":\"wear\",\"market\":\"overseas\"},{\"product\":\"woot-neck\",\"raw\":20,\"kept\":20,\"method\":\"1星Top排序10条＋5星Most Recent排序10条，排除置顶重复。按星级定向抽样，不用于估算正负面比例；品牌未确认，以ASIN定位。\",\"productName\":\"Cordless Heated Scarf · ASIN B0D818Z9CZ\",\"category\":\"neck\",\"market\":\"overseas\"},{\"product\":\"morfit\",\"raw\":27,\"kept\":24,\"method\":\"读取六个分页，按日期+正文去重；剔除两条仅商品名及一条门店人员评价。邀请、访客与转载来源分别标明。\",\"productName\":\"Morfit Electric Adjustable Lumbar Support\",\"category\":\"back\",\"market\":\"overseas\"},{\"product\":\"hipee-child\",\"raw\":3,\"kept\":3,\"method\":\"商品页精选3条预览；全部评价入口返回“页面正在维修中”。缺少日期、所购规格，不用于好评率或型号性能归因。\",\"productName\":\"HiPee P1 儿童款（独立样本）\",\"category\":\"wear\",\"market\":\"china\"},{\"product\":\"core\",\"raw\":8,\"kept\":8,\"method\":\"Best Buy转载Hyperice评论第1页8条；包含促销和ExpertVoice来源，不能全称为核验买家。中文为概括，不计算总体好评率。\",\"productName\":\"Hyperice Core Premium 冥想训练器\",\"category\":\"touch\",\"market\":\"overseas\"},{\"product\":\"hipee\",\"raw\":14,\"kept\":14,\"method\":\"读取14条完整正文/所购规格；保留首评和有效追评，同评论不重复计数。非随机排序，分页超时部分不计入；剔除不同型号及套装。\",\"rejected\":[{\"row\":5,\"reason\":\"默认空评\"},{\"row\":7,\"reason\":\"默认空评\"}],\"productName\":\"HiPee 成人智能矫姿精灵（黑/红）\",\"category\":\"wear\",\"market\":\"china\"},{\"product\":\"catprince\",\"raw\":80,\"kept\":72,\"method\":\"读取80条完整正文/所购规格；保留首评和有效追评，同评论不重复计数。非随机排序，分页超时部分不计入；剔除不同型号及套装。\",\"rejected\":[{\"row\":6,\"reason\":\"桌面支架套装评价不可归因矫姿环\"},{\"row\":18,\"reason\":\"桌面支架套装评价不可归因矫姿环\"},{\"row\":19,\"reason\":\"桌面支架套装评价不可归因矫姿环\"}],\"productName\":\"猫太子 智能矫姿环·豪华液晶款\",\"category\":\"wear\",\"market\":\"china\"},{\"product\":\"grandkid\",\"raw\":16,\"kept\":15,\"method\":\"读取16条完整正文/所购规格；保留首评和有效追评，同评论不重复计数。非随机排序，分页超时部分不计入；剔除不同型号及套装。\",\"rejected\":[{\"row\":3,\"reason\":\"A1不同型号\"}],\"productName\":\"Grandkid A2 智能矫姿精灵\",\"category\":\"wear\",\"market\":\"china\"},{\"product\":\"kpte\",\"raw\":20,\"kept\":20,\"method\":\"商品评价首屏（接口order=3，非随机）；正文最多150字、规格最多40字，可能截断。不计算总体好评率。\",\"rejected\":[],\"productName\":\"KPTE 护腕鼠标垫·渐变系列\",\"category\":\"mouse\",\"market\":\"china\"},{\"product\":\"factory\",\"raw\":20,\"kept\":18,\"method\":\"商品评价首屏（接口order=3，非随机）；正文最多150字、规格最多40字，可能截断。不计算总体好评率。\",\"rejected\":[{\"row\":7,\"reason\":\"套装或正文描述鼠标而非鼠标垫\"},{\"row\":9,\"reason\":\"套装或正文描述鼠标而非鼠标垫\"}],\"productName\":\"天天特卖工厂 记忆棉护腕垫\",\"category\":\"mouse\",\"market\":\"china\"},{\"product\":\"guohuo\",\"raw\":20,\"kept\":17,\"method\":\"商品评价首屏（接口order=3，非随机）；正文最多150字、规格最多40字，可能截断。不计算总体好评率。\",\"rejected\":[{\"row\":12,\"reason\":\"随机款不能归到护腕型号\"},{\"row\":14,\"reason\":\"随机款不能归到护腕型号\"},{\"row\":17,\"reason\":\"随机款不能归到护腕型号\"}],\"productName\":\"官方国货甄选 护腕鼠标垫\",\"category\":\"mouse\",\"market\":\"china\"},{\"product\":\"mido\",\"raw\":20,\"kept\":20,\"method\":\"商品评价首屏（接口order=3，非随机）；正文最多150字、规格最多40字，可能截断。不计算总体好评率。\",\"rejected\":[],\"productName\":\"米多腰靠小店 人体工学气动腰靠\",\"category\":\"back\",\"market\":\"china\"},{\"product\":\"zuodeng\",\"raw\":20,\"kept\":20,\"method\":\"商品评价首屏（接口order=3，非随机）；正文最多150字、规格最多40字，可能截断。不计算总体好评率。\",\"rejected\":[],\"productName\":\"佐登耐 人体工学腰靠（含乳胶气动款）\",\"category\":\"back\",\"market\":\"china\"},{\"product\":\"stg\",\"raw\":20,\"kept\":20,\"method\":\"读取20条完整正文/所购规格；保留首评和有效追评，同评论不重复计数。非随机排序，分页超时部分不计入；剔除不同型号及套装。\",\"rejected\":[],\"productName\":\"STG 腰靠·经典/加厚/气动升级混款\",\"category\":\"back\",\"market\":\"china\"},{\"product\":\"mijoy\",\"raw\":20,\"kept\":20,\"method\":\"商品评价首屏（接口order=3，非随机）；正文最多150字、规格最多40字，可能截断。晒单奖励可能增加正向表达。不计算总体好评率。\",\"rejected\":[],\"productName\":\"米乔 气动护脊版腰靠\",\"category\":\"back\",\"market\":\"china\"},{\"product\":\"tianbei\",\"raw\":0,\"kept\":0,\"method\":\"商品评价首屏（接口order=3，非随机）；正文最多150字、规格最多40字，可能截断。未取得评价正文，不等于没有评价。\",\"rejected\":[],\"productName\":\"庆北旗舰店 充电热敷护颈·2600mAh\",\"category\":\"neck\",\"market\":\"china\"},{\"product\":\"yuanqi\",\"raw\":0,\"kept\":0,\"method\":\"商品评价首屏（接口order=3，非随机）；正文最多150字、规格最多40字，可能截断。未取得评价正文，不等于没有评价。\",\"rejected\":[],\"productName\":\"元气地带 智能电热护颈·三档款\",\"category\":\"neck\",\"market\":\"china\"},{\"product\":\"mujie\",\"raw\":0,\"kept\":0,\"method\":\"商品评价首屏（接口order=3，非随机）；正文最多150字、规格最多40字，可能截断。未取得评价正文，不等于没有评价。\",\"rejected\":[],\"productName\":\"MUJIE商城222 发热围巾·81×10cm\",\"category\":\"neck\",\"market\":\"china\"},{\"product\":\"ruierfu\",\"raw\":0,\"kept\":0,\"method\":\"商品评价首屏（接口order=3，非随机）；正文最多150字、规格最多40字，可能截断。未取得评价正文，不等于没有评价。\",\"rejected\":[],\"productName\":\"中科瑞尔福 充电热敷颈带\",\"category\":\"neck\",\"market\":\"china\"},{\"product\":\"sharper\",\"productName\":\"Sharper Image Cordless Neck Heat Therapy Wrap 207905\",\"category\":\"neck\",\"market\":\"overseas\",\"raw\":10,\"kept\":10,\"method\":\"10条唯一首屏记录；翻页仍返回同页，未重复计数；其中4条已在型号资料中收录，合并进入统一样本库。\"},{\"product\":\"moonbird\",\"productName\":\"Moonbird 成人呼吸引导器\",\"category\":\"touch\",\"market\":\"overseas\",\"raw\":15,\"kept\":15,\"method\":\"公开品牌评论页中定向选取15条明确提及Moonbird的使用或故障体验；排除Moonbuddy、型号不明及纯客服记录；不使用页面AI摘要。页面1实时、页面2为检索缓存，两个时点的品牌总评数不相加。日期为评论列出的体验日期。\"}]}");
const jsonValue0 = value["sources"];const jsonValue1 = value["audit"];

var img0 = JSON.parse("\"./assets/image.365bc188ce66ca55.png\"");

var img1 = JSON.parse("\"./assets/image.b2a787175df6edcc.png\"");

var img2 = JSON.parse("\"./assets/image.fd06ef31aebd4c3d.webp\"");

var img3 = JSON.parse("\"./assets/image.c7050935cff2125f.webp\"");

var img4 = JSON.parse("\"./assets/image.ef7f1c3549fb3977.webp\"");

var img5 = JSON.parse("\"./assets/image.40b3dde85255bf82.webp\"");

var img6 = JSON.parse("\"./assets/image.cd33c4482ed73734.png\"");

var img7 = JSON.parse("\"./assets/image.ac92924d642cdd00.png\"");

var img8 = JSON.parse("\"./assets/image.62a0d6602f5b0659.png\"");

var img9 = JSON.parse("\"./assets/image.d7bd6e00d0af14a3.webp\"");

var img10 = JSON.parse("\"./assets/image.31753db89dc847d1.webp\"");

var img11 = JSON.parse("\"./assets/image.bb529f7b54629548.webp\"");

var img12 = JSON.parse("\"./assets/image.6b06fff07d6b8b7e.webp\"");

var img13 = JSON.parse("\"./assets/image.a6a1db6abcf3aa31.jpeg\"");

var img14 = JSON.parse("\"./assets/image.fc199d836ba60b1f.jpeg\"");

var img15 = JSON.parse("\"./assets/image.48604e866ecfa2e0.jpeg\"");

var img16 = JSON.parse("\"./assets/image.b9db35d313079fc9.png\"");

var img17 = JSON.parse("\"./assets/image.f6b3f505b23c1a00.webp\"");

var img18 = JSON.parse("\"./assets/image.f5830fb793903e3d.webp\"");

var img19 = JSON.parse("\"./assets/image.c9deccbc4a0ea435.webp\"");

var img20 = JSON.parse("\"./assets/image.1b046eeca4fa7f20.webp\"");

var img21 = JSON.parse("\"./assets/image.044f2373c05649a5.webp\"");

var img22 = JSON.parse("\"./assets/image.83b63f8734ba7524.jpeg\"");

var img23 = JSON.parse("\"./assets/image.f6fec1dafb464b5c.jpeg\"");

var img24 = JSON.parse("\"./assets/image.a3ffaa09a4ad15f4.jpeg\"");

var img25 = JSON.parse("\"./assets/image.12030a2168d2908b.webp\"");

var img26 = JSON.parse("\"./assets/image.a3f56fdd998423ca.webp\"");

var img27 = JSON.parse("\"./assets/image.811c23ea2f2ca555.webp\"");

var img28 = JSON.parse("\"./assets/image.924153c484b8f694.webp\"");

var img29 = JSON.parse("\"./assets/image.34ab293dcaafadc0.jpeg\"");

var img30 = JSON.parse("\"./assets/image.0c0cfa60615fabb2.webp\"");

var img31 = JSON.parse("\"./assets/image.d9d5ac1e017b5d51.jpeg\"");

const deepAssets = {

  "moonbird": img0,

  "reflect": img1,

  "core": img2,

  "hipee": img3,

  "catprince": img4,

  "grandkid": img5,

  "upright2": img6,

  "uprights": img7,

  "kodgem": img8,

  "kpte": img9,

  "factory": img10,

  "guohuo": img11,

  "ugreen": img12,

  "mosiso": img13,

  "ktrio": img14,

  "gorilla": img15,

  "carpio": img16,

  "mido": img17,

  "zuodeng": img18,

  "stg": img19,

  "mijoy-electric": img20,

  "mijoy": img21,

  "morfit": img22,

  "thermarest": img23,

  "optp": img24,

  "tianbei": img25,

  "yuanqi": img26,

  "mujie": img27,

  "ruierfu": img28,

  "woot-neck": img29,

  "comfheat": img30,

  "sharper": img31,

"mijia-back": "./assets/image.e03296e2bb2fedc7.webp","breo-y3pro": "./assets/image.ba427e2b3fda4407.webp","osim-ujs": "./assets/image.086ee829db90f19c.webp","snailax-256": "./assets/image.0348f018109b286a.webp","snailax-228": "./assets/image.6f9f820c957260db.webp","sihoo-s300": "./assets/image.291defd104899504.webp",};

var image0 = JSON.parse("\"./assets/image.6c0108c64f508d27.png\"");

var image1 = JSON.parse("\"./assets/image.73482909dbca1f53.webp\"");

var image2 = JSON.parse("\"./assets/image.4cbb890c4a4b1bcf.webp\"");

var image3 = JSON.parse("\"./assets/image.e55ab37a11207f5c.png\"");

var image4 = JSON.parse("\"./assets/image.2d4b9540762edf6c.webp\"");

var image5 = JSON.parse("\"./assets/image.37157c2ffe2a46a3.webp\"");

var image6 = JSON.parse("\"./assets/image.3712879458893cf3.webp\"");

var image7 = JSON.parse("\"./assets/image.7bdbcdb14a15a8d3.png\"");

var image8 = JSON.parse("\"./assets/image.3e5bacd666a17f34.png\"");

var image9 = JSON.parse("\"./assets/image.1a0e4dad8fa2f2d1.jpeg\"");

var image10 = JSON.parse("\"./assets/image.874a244c47355929.jpeg\"");

var image11 = JSON.parse("\"./assets/image.b198c0670108d380.png\"");

var image12 = JSON.parse("\"./assets/image.cc175f0bb84cf910.jpeg\"");

const dossierAssets = {"moonbird-product-1":image0,"core-product-16":image1,"hipee-5":image2,"upright-necklace-2":image3,"ugreen-detail-2":image4,"ugreen-detail-3":image5,"ugreen-detail-4":image6,"carpio-size":image7,"mijoy-product-10":image8,"mijoy-product-22":image9,"mijoy-product-29":image10,"morfit-build":image11,"sharper-details":image12};

const Link = ({ href, children, ...props }) => jsxRuntime.jsxs('a', { href: href, target: "_blank", rel: "noopener noreferrer" , ...props, children: [children, " ↗" ]});



function ProductDossier({ categoryId, products, dossiers, selectedId, onSelect, samples, extraReviews, onReviews }) {

  if (!products.length) return null;

  const product = products.find(p => p.id === selectedId) || products[0];

  const dossier = dossiers.find(d => d.id === product.id);

  const sources = Object.fromEntries(dossier.resources.map(r => [r.id, r]));

  const quoted = samples.filter(s => dossier.sampleIds.includes(s.id));

  const added = extraReviews.filter(s => (dossier.newReviewIds || []).includes(s.id));

  const appendix = `A.${categoryIds.indexOf(categoryId) + 1}`;

  const modelNumber = `${appendix}.${dossiers.findIndex(d => d.id === product.id) + 1}`;

  const query = `v6_dossiers_${categoryId}`;

  const productQuery = `v5_products_${categoryId}`;

  const sampleQuery = `v5_samples_${categoryId}`;

  const refLinks = ids => jsxRuntime.jsx('div', { className: "dossier-refs", children: ids.map(id => sources[id] && jsxRuntime.jsx(Link, { href: sources[id].url, children: sources[id].title}, id))});

  return jsxRuntime.jsxs('section', { id: "deep-dossier", className: "deep-section product-dossier report-appendix"  , children: [
    jsxRuntime.jsx(dataApp.RichNarrative, { className: "report-prose", id: "v6:dossier-intro", value: numberHeading('## 02B / 拆开看优势：结构、操作与证据\n\n先选型号。每个优势都连接到具体结构或操作、原始资料和使用限制；**厂商图文说明“怎样实现”，买家反馈说明“实际可能遇到什么”。**', `附录 ${appendix}`),} )
    , jsxRuntime.jsxs('div', { className: "dossier-selector", children: [jsxRuntime.jsxs('label', { children: ["选择要深入了解的型号", jsxRuntime.jsx('select', { 'aria-label': "竞品资料型号", value: product.id, onChange: e => onSelect(e.target.value), children: products.map(p => jsxRuntime.jsxs('option', { value: p.id, children: [p.market === 'china' ? '中国' : '海外', " · "  , p.name]}, p.id))})]}), jsxRuntime.jsx('p', { children: "也可以点击上方产品卡的“安装、结构与优势依据”。"})]})
    , jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: `v6-dossier-${categoryId}`, queryId: query, queryIds: [query, productQuery, sampleQuery, 'v6_new_reviews'], sourceRowsByQuery: {[query]: [dossier], [productQuery]: [product], [sampleQuery]: quoted, v6_new_reviews: added}, title: `${product.name} · 资料与机制`, kind: "figure", displayRows: [dossier], variant: "plain", children: 
      jsxRuntime.jsxs('div', { 'data-reviewed-rows': true, className: "dossier-sheet", children: [
        jsxRuntime.jsxs('header', { className: "dossier-heading", children: [jsxRuntime.jsx('img', { src: deepAssets[product.id], alt: product.name, loading: "lazy",} ), jsxRuntime.jsxs('div', { children: [jsxRuntime.jsxs('span', { className: "report-figure-number", children: ["档案 " , modelNumber]}), jsxRuntime.jsxs('span', { className: "dossier-eyebrow", children: ["型号资料卡 · "  , dossier.coverage]}), jsxRuntime.jsx('h3', { children: product.name}), jsxRuntime.jsx('p', { children: product.target}), jsxRuntime.jsx(Link, { href: product.url, children: "打开同型号原始商品页"})]})]})
        , jsxRuntime.jsxs('div', { className: "dossier-flow", 'aria-label': "优势核查流程", children: [jsxRuntime.jsx('span', { children: "01 具体优势" }), jsxRuntime.jsx('b', { children: "→"}), jsxRuntime.jsx('span', { children: "02 实现机制" }), jsxRuntime.jsx('b', { children: "→"}), jsxRuntime.jsx('span', { children: "03 图文 / 教程"   }), jsxRuntime.jsx('b', { children: "→"}), jsxRuntime.jsx('span', { children: "04 评价与限制" })]})
        , dossier.claims.map((claim, index) => jsxRuntime.jsxs('article', { className: "dossier-claim", children: [jsxRuntime.jsxs('div', { className: "dossier-advantage", children: [jsxRuntime.jsx('span', { children: "要理解的优势"}), jsxRuntime.jsx('h4', { children: claim.advantage})]}), jsxRuntime.jsxs('div', { className: "dossier-explanation", children: [jsxRuntime.jsx('h5', { children: "靠什么实现"}), jsxRuntime.jsx('p', { children: claim.mechanism}), refLinks(claim.refs), jsxRuntime.jsxs('div', { className: "dossier-limit", children: [jsxRuntime.jsx('h5', { children: "优势成立的条件 / 不能推出的结论"  }), jsxRuntime.jsx('p', { children: claim.limit})]}), jsxRuntime.jsxs('div', { className: "dossier-implication", children: [jsxRuntime.jsx('h5', { children: "对我们意味着什么 · 研究判断"  }), jsxRuntime.jsx('p', { children: claim.implication})]})]})]}, index))
        , jsxRuntime.jsxs('details', { className: "dossier-specs", children: [jsxRuntime.jsxs('summary', { children: ["完整配置与新增核实参数 · "  , Object.keys({...product.specs,...dossier.extraSpecs}).length + 1, " 项" ]}), jsxRuntime.jsxs('dl', { children: [Object.entries({...product.specs,...dossier.extraSpecs}).map(([k,v]) => jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: k}), jsxRuntime.jsx('dd', { children: v})]}, k)), jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "供电与维护"}), jsxRuntime.jsx('dd', { children: product.power})]})]})]})
        , dossier.photos.length > 0 && jsxRuntime.jsxs('section', { className: "dossier-photos", children: [jsxRuntime.jsx('h4', { children: "细节图：先看关键部位"}), jsxRuntime.jsx('div', { className: "dossier-photo-grid", children: dossier.photos.map((photo, photoIndex) => jsxRuntime.jsxs('figure', { children: [jsxRuntime.jsxs('details', { className: "dossier-image-expand", children: [jsxRuntime.jsxs('summary', { 'aria-label': `展开原比例图：${photo.title}`, children: [jsxRuntime.jsx('img', { src: dossierAssets[photo.key], alt: photo.title, loading: "lazy",} ), jsxRuntime.jsx('span', { children: "展开原比例图 ↓" })]}), jsxRuntime.jsx('img', { className: "dossier-full-image", src: dossierAssets[photo.key], alt: `${photo.title} · 完整图`, loading: "lazy",} )]}), jsxRuntime.jsxs('figcaption', { children: [jsxRuntime.jsxs('span', { className: "report-figure-number", children: ["图 " , modelNumber, "-", photoIndex + 1]}), jsxRuntime.jsx('b', { children: photo.title}), jsxRuntime.jsx('p', { children: photo.note}), jsxRuntime.jsx(Link, { href: photo.url, children: "原图"}), " · "  , jsxRuntime.jsx(Link, { href: sources[photo.source].url, children: "发布页面"})]})]}, photo.key))})]})
        , dossier.steps.length > 0 && jsxRuntime.jsxs('section', { className: "dossier-setup", children: [jsxRuntime.jsx('h4', { children: "从拿到手到用起来"}), jsxRuntime.jsx('p', { className: "dossier-muted", children: dossier.stepsBasis}), jsxRuntime.jsx('ol', { children: dossier.steps.map((step,i)=>jsxRuntime.jsxs('li', { children: [jsxRuntime.jsx('b', { children: String(i+1).padStart(2,'0')}), jsxRuntime.jsx('p', { children: step})]}, i))})]})
        , jsxRuntime.jsxs('section', { className: "dossier-resources", children: [jsxRuntime.jsx('h4', { children: "原始资料：带着问题看"}), jsxRuntime.jsx('p', { className: "dossier-muted", children: "优先看官方说明书与操作教程。海外视频或Google Drive可能受网络限制；淘宝页面可能需要登录。未逐帧审阅的视频已标出，不把入口核验写成完整观看。" }), jsxRuntime.jsx('div', { className: "dossier-resource-grid", children: dossier.resources.map(r=>jsxRuntime.jsxs('article', { children: [jsxRuntime.jsxs('div', { className: "dossier-resource-top", children: [jsxRuntime.jsx('span', { className: r.kind.includes('视频')?'video':'', children: r.kind}), jsxRuntime.jsx('small', { children: r.publisher})]}), jsxRuntime.jsx('h5', { children: jsxRuntime.jsx(Link, { href: r.url, children: r.title})}), jsxRuntime.jsxs('p', { children: [jsxRuntime.jsx('b', { children: "适用范围："}), r.scope]}), jsxRuntime.jsxs('p', { children: [jsxRuntime.jsx('b', { children: "重点看："}), r.look]}), r.video && jsxRuntime.jsxs('details', { className: "dossier-video", children: [jsxRuntime.jsx('summary', { children: "在这里播放官方演示"}), jsxRuntime.jsx('video', { controls: true, playsInline: true, preload: "none", src: r.video, children: "浏览器不支持播放，请打开原网页。"}), jsxRuntime.jsx(Link, { href: r.video, children: "打开原视频"})]}), jsxRuntime.jsx('small', { className: "dossier-verification", children: r.checked})]}, r.id))})]})
        , jsxRuntime.jsxs('section', { className: "dossier-buyers", children: [jsxRuntime.jsx('h4', { children: "再用买家反馈检查这个优势"}), jsxRuntime.jsx('p', { className: "dossier-muted", children: dossier.buyerNote}), [...quoted,...added].length > 0 && jsxRuntime.jsx('div', { className: "dossier-review-grid", children: [...quoted,...added].map(s => jsxRuntime.jsxs('article', { children: [jsxRuntime.jsxs('span', { children: [s.id, " · "  , s.date]}), jsxRuntime.jsx('p', { children: s.excerpt}), jsxRuntime.jsxs('small', { children: [s.kind, s.spec ? ` · ${s.spec}` : '', s.truncated ? ' · 原采集可能截断' : '']}), s.url && jsxRuntime.jsx(Link, { href: s.url, children: "评论所在商品页"})]}, s.id))}), samples.some(s=>s.product===product.id) && jsxRuntime.jsx('button', { className: "deep-disclosure", type: "button", onClick: ()=>onReviews(product.id), children: "查看本型号的全部已采评价 ↓" })]})
        , jsxRuntime.jsxs('footer', { className: "dossier-takeaway", children: [jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('h4', { children: "建议买样后验证"}), jsxRuntime.jsx('p', { children: dossier.test})]}), jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('h4', { children: "这份资料还有哪些缺口"}), jsxRuntime.jsx('p', { children: dossier.gap})]})]})
      ]}, product.id)
    })
  ]});

}

const sources$1 = Object.fromEntries(value.sources.map(s => [s.id, s]));

function ReviewEvidence({ ids, samples }) {
  return jsxRuntime.jsxs('details', { className: "review-evidence", children: [jsxRuntime.jsxs('summary', { children: ["支撑记录 · "  , ids.join('、')]}), ids.map(id => {
    const s = samples[id];
    return jsxRuntime.jsxs('div', { className: "review-evidence-row", children: [jsxRuntime.jsxs('b', { children: [id, " · "  , s.productName]}), jsxRuntime.jsxs('small', { children: [s.date, " · "  , s.spec]}), jsxRuntime.jsx('p', { children: s.excerpt}), jsxRuntime.jsx('small', { children: s.kind}), jsxRuntime.jsxs('a', { href: sources$1[s.source].url, target: "_blank", rel: "noopener noreferrer" , children: [s.source, " · 来源页面 ↗"   ]})]}, id);
  })]});
}

function ReviewAnalysis({ categoryId, market, allSamples }) {
  const { snapshot } = dataApp.useDataApp();
  const rows = id => snapshot.queries[id].rows;
  const models = rows(`review_model_${categoryId}`).filter(r => market === 'all' || r.market === market);
  const findings = [...rows(`review_analysis_${categoryId}`)].sort((a, b) => a.priority.localeCompare(b.priority));
  const sampleMap = Object.fromEntries(allSamples.map(s => [s.id, s]));
  const coverage = rows('review_coverage').find(r => r.category === categoryId);
  const sampleQuery = `v5_samples_${categoryId}`;
  const modelQuery = `review_model_${categoryId}`;
  const analysisQuery = `review_analysis_${categoryId}`;
  return jsxRuntime.jsxs('div', { className: "review-analysis", children: [
    jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: `review-coverage-${categoryId}`, queryId: "review_coverage", title: "评论覆盖与证据边界", kind: "figure", displayRows: [coverage], sourceRows: [coverage], variant: "plain", children: 
      jsxRuntime.jsxs('div', { className: "review-coverage", 'data-reviewed-rows': true, children: [jsxRuntime.jsxs('span', { children: [jsxRuntime.jsx('b', { children: coverage.records}), "条本类评论记录"]}), jsxRuntime.jsxs('span', { children: [jsxRuntime.jsxs('b', { children: [coverage.covered, " / "  , coverage.models]}), "个对标型号有评论"]}), jsxRuntime.jsxs('span', { children: [jsxRuntime.jsxs('b', { children: [coverage.china, " / "  , coverage.overseas]}), "条中国 / 海外记录"  ]})]})
    })
    , jsxRuntime.jsx(dataApp.RichNarrative, { id: `review-method-${categoryId}`, className: "report-prose", value: '**阅读口径：** 按具体型号区分购买动机、满意点与持续使用阻力。下列编号为人工选取的支撑例证，不是全样本主题发生率。初评与追评合并；五星也可能含负面正文。没有买过的人不在评论样本中，因此“购买后不满”不能直接当作所有人的“不购买原因”。',} )
    , jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: `review-models-${categoryId}`, queryId: modelQuery, queryIds: [modelQuery, sampleQuery], sourceRowsByQuery: { [modelQuery]: models, [sampleQuery]: allSamples }, title: "逐型号：为什么买、认可什么、什么妨碍留用", kind: "table", displayRows: models, children: 
      jsxRuntime.jsx(dataApp.DataTable, { rows: models, searchable: false, pageSize: 20, caption: "型号体验对照", columns: [
        { key: 'productName', label: '具体型号 / 样本', renderCell: (v, r) => jsxRuntime.jsxs('span', { className: "review-model-name", children: [jsxRuntime.jsx('b', { children: v}), jsxRuntime.jsxs('small', { children: [r.sampleCount, "条记录 · "  , r.market === 'china' ? '中国' : '海外']})]}) },
        { key: 'motive', label: '谁买、为什么买', renderCell: v => jsxRuntime.jsx('span', { className: "review-cell", children: v}) },
        { key: 'value', label: '认可的价值', renderCell: v => jsxRuntime.jsx('span', { className: "review-cell", children: v}) },
        { key: 'friction', label: '不满与留用阻力', renderCell: (v, r) => jsxRuntime.jsxs('div', { className: "review-cell", children: [v, r.sampleIds.length > 0 && jsxRuntime.jsx(ReviewEvidence, { ids: r.sampleIds, samples: sampleMap,} )]}) },
        { key: 'implication', label: '对本项目的判断', renderCell: v => jsxRuntime.jsx('span', { className: "review-cell", children: v}) }
      ],} )
    })
    , jsxRuntime.jsx(dataApp.RichNarrative, { id: `review-priority-method-${categoryId}`, className: "report-prose", value: '### 中外证据综合：优先验证什么\n\n**P0 基础可用性与安全 → P1 持续使用与产品定位 → P2 商业表达与服务。** 按失败影响和项目相关性排序，不按评论条数排名。以下为整类综合判断，保留跨市场证据；型号表按所选市场展示。验证方法是研究建议，尚未实施。',} )
    , jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: `review-findings-${categoryId}`, queryId: analysisQuery, queryIds: [analysisQuery, sampleQuery], sourceRowsByQuery: { [analysisQuery]: findings, [sampleQuery]: allSamples }, title: "评论事实 → 研究判断 → 验证方法"    , kind: "figure", displayRows: findings, variant: "plain", children: 
      jsxRuntime.jsx('div', { className: "review-findings", 'data-reviewed-rows': true, children: findings.map(f => jsxRuntime.jsxs('section', { className: "review-finding", children: [jsxRuntime.jsxs('div', { className: "review-finding-heading", children: [jsxRuntime.jsx('span', { className: `review-priority ${f.priority.toLowerCase()}`, children: f.priority}), jsxRuntime.jsx('h4', { children: f.title})]}), jsxRuntime.jsxs('p', { className: "review-signal", children: ["证据强度：", f.signal]}), jsxRuntime.jsxs('dl', { children: [jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "评论事实"}), jsxRuntime.jsx('dd', { children: f.fact})]}), jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "研究判断"}), jsxRuntime.jsx('dd', { children: f.judgment.replace(/^研究判断：/, '')})]}), jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "验证方法"}), jsxRuntime.jsx('dd', { children: f.test.replace(/^验证建议：/, '')})]})]}), jsxRuntime.jsx(ReviewEvidence, { ids: f.sampleIds, samples: sampleMap,} )]}, f.id))})
    })
  ]});
}

const sourceMap = Object.fromEntries(value.sources.map(s => [s.id, s]));

const statusLabels = { yes: '✓', no: '✕', unknown: '?', plan: '拟' };

const statusNames = { yes: '来源明确支持', no: '明确不支持或纯被动结构不具备', unknown: '未查到或存在冲突', plan: 'BP规划，尚未验证' };

const money = (p) => p.price == null ? '价格待核' : `${p.currency === 'CNY' ? '¥' : 'US$'}${p.price.toLocaleString('en-US', { minimumFractionDigits: Number.isInteger(p.price) ? 0 : 2 })}`;

const marketName = value => value === 'china' ? '中国市场' : '海外市场';



function Copy({ id, value, number }) {

  return jsxRuntime.jsx(dataApp.RichNarrative, { className: "report-prose", id: `v5:${id}:copy`, value: numberHeading(value, number),} );

}



function SourceLinks({ ids }) {

  return jsxRuntime.jsx('span', { className: "deep-sources", children: [...new Set(ids)].filter(id => sourceMap[id]).map(id => jsxRuntime.jsxs('a', { href: sourceMap[id].url, target: "_blank", rel: "noopener noreferrer" , title: `${sourceMap[id].title} · ${sourceMap[id].scope}`, children: [id, " · "  , sourceMap[id].kind, " ↗" ]}, id))});

}



function Mark({ value }) {

  return jsxRuntime.jsxs('span', { className: `deep-feature ${value.status}`, title: statusNames[value.status], children: [jsxRuntime.jsx('b', { 'aria-label': statusNames[value.status], children: statusLabels[value.status]}), jsxRuntime.jsx('small', { children: value.note})]});

}



function ProductCard({ product: p, onDossier }) {

  const [open, setOpen] = react.useState(false);

  return jsxRuntime.jsxs('article', { className: "deep-product", 'data-product-id': p.id, children: [
    jsxRuntime.jsx('a', { className: "deep-product-image", href: p.url, target: "_blank", rel: "noopener noreferrer" , 'aria-label': `打开${p.name}商品或来源页`, children: 
      deepAssets[p.id] ? jsxRuntime.jsx('img', { src: deepAssets[p.id], alt: `${p.name} · ${p.imageNote}`, loading: "lazy",} ) : jsxRuntime.jsxs('span', { className: "deep-image-missing", children: [jsxRuntime.jsx('strong', { children: p.short}), jsxRuntime.jsx('span', { children: "点击前往商品页看图 ↗" })]})
    })
    , jsxRuntime.jsxs('div', { className: "deep-product-content", children: [
      jsxRuntime.jsxs('p', { className: "deep-photo-note", children: ["图源说明：", p.imageNote]})
      , jsxRuntime.jsxs('div', { className: "deep-product-tags", children: [jsxRuntime.jsx('span', { children: p.role}), jsxRuntime.jsx('span', { children: marketName(p.market)})]})
      , jsxRuntime.jsx('h4', { children: jsxRuntime.jsxs('a', { href: p.url, target: "_blank", rel: "noopener noreferrer" , children: [p.name, " ↗" ]})})
      , jsxRuntime.jsxs('div', { className: "deep-price", children: [jsxRuntime.jsx('strong', { children: money(p)}), jsxRuntime.jsx('span', { className: p.priceType === '页面报价' ? 'current' : '', children: p.priceType})]})
      , jsxRuntime.jsx('p', { className: "deep-price-note", children: p.priceNote})
      , jsxRuntime.jsxs('dl', { children: [jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "竞争哪项功能"}), jsxRuntime.jsx('dd', { children: p.overlap})]}), jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "目标用户"}), jsxRuntime.jsx('dd', { children: p.target})]})]})
      , jsxRuntime.jsx('dl', { className: "deep-specs", children: Object.entries(p.specs).map(([key, value]) => jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: key}), jsxRuntime.jsx('dd', { children: value})]}, key))})
      , jsxRuntime.jsx('p', { className: "deep-sample-count", children: p.reviewCount ? `保留 ${p.reviewCount} 条可归属评论记录，验证与历史款边界见下方摘录。` : '未取得可归属的用户评论正文。'})
      , jsxRuntime.jsxs('button', { type: "button", className: "deep-disclosure", 'aria-expanded': open, onClick: () => setOpen(!open), children: [open ? '收起' : '展开', "销量线索、供电与取舍 " , open ? '−' : '+']})
      , open && jsxRuntime.jsx('div', { className: "deep-product-more", children: jsxRuntime.jsxs('dl', { children: [jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "销量证据"}), jsxRuntime.jsx('dd', { children: p.signal})]}), jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "供电与维护"}), jsxRuntime.jsx('dd', { children: p.power})]}), jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "值得讨论"}), jsxRuntime.jsx('dd', { children: p.watch})]})]})})
      , jsxRuntime.jsx(SourceLinks, { ids: p.refs,} )
      , jsxRuntime.jsx('button', { type: "button", className: "dossier-open", onClick: () => onDossier(p.id), children: "安装、结构与优势依据 ↓" })
    ]})
  ]});

}



function ProductGallery({ products, onDossier }) {

  return jsxRuntime.jsx('div', { 'data-reviewed-rows': true, children: ['china', 'overseas'].map(market => {

    const rows = products.filter(p => p.market === market);

    return rows.length ? jsxRuntime.jsxs('section', { className: "deep-market-group", children: [jsxRuntime.jsxs('h3', { children: [marketName(market), " " , jsxRuntime.jsxs('span', { children: [rows.length, "个型号"]})]}), jsxRuntime.jsx('div', { className: "deep-product-grid", children: rows.map(p => jsxRuntime.jsx(ProductCard, { product: p, onDossier: onDossier,}, p.id ))})]}, market) : null;

  })});

}



function PriceReadout({ products }) {

  return jsxRuntime.jsx('div', { className: "deep-price-readout", 'data-reviewed-rows': true, children: ['china', 'overseas'].map(market => {

    const ps = products.filter(p => p.market === market);

    if (!ps.length) return null;

    const eligible = ps.filter(p => p.price !== null && ['页面报价', '优惠码报价', '起价/页面报价'].includes(p.priceType));

    const imagePrices = ps.filter(p => p.price !== null && p.priceType === '搜索优惠展示价');

    const values = eligible.map(p => p.price);

    const range = values.length ? `${market === 'china' ? '¥' : 'US$'}${Math.min(...values).toFixed(2)}${values.length > 1 && Math.max(...values) !== Math.min(...values) ? `–${Math.max(...values).toFixed(2)}` : ''}` : '当前报价不足';

    return jsxRuntime.jsxs('section', { children: [jsxRuntime.jsxs('span', { children: [marketName(market), " · 本次样本"  ]}), jsxRuntime.jsx('strong', { children: range}), jsxRuntime.jsx('p', { children: eligible.length ? `${eligible.length}个型号的页面报价，未含运费税费；只描述选取样本，不是全市场价格区间。` : '没有足够的同口径有效当前报价；搜索展示价在下面单列。'}), imagePrices.length > 0 && jsxRuntime.jsxs('p', { children: [jsxRuntime.jsxs('b', { children: ["搜索展示区间：¥", Math.min(...imagePrices.map(p => p.price)), "–", Math.max(...imagePrices.map(p => p.price))]}), jsxRuntime.jsx('br', {}), imagePrices.map(p => `${p.short} ${money(p)}${p.id === 'ugreen' ? '起' : ''}`).join('；'), "。优惠条件和实际结算价未核，不计入上方区间。"]})]}, market);

  })});

}



function RankPanel({ category, rows, market }) {

  const scoped = rows.filter(r => market === 'all' || r.market === market);

  const present = new Set(scoped.map(r => r.market));

  const missing = ['china', 'overseas'].filter(m => (market === 'all' || market === m) && !present.has(m));

  const columns = [

    { key: 'rank', label: '页面名次', renderCell: value => jsxRuntime.jsx('b', { children: value == null ? '未排位' : `TOP ${value}`}) },

    { key: 'name', label: '具体商品', renderCell: (v, r) => jsxRuntime.jsxs('a', { href: r.url, target: "_blank", rel: "noopener noreferrer" , children: [v, " ↗" ]}) },

    { key: 'signal', label: '公开销售线索及口径' },

    { key: 'price', label: '同页报价' },

    { key: 'fit', label: '与本项目的关系' }

  ];

  return jsxRuntime.jsxs('div', { 'data-reviewed-rows': true, className: "deep-rank-list", children: [
    scoped.map(r => jsxRuntime.jsxs('section', { className: "deep-rank", children: [jsxRuntime.jsx('h3', { children: r.title}), jsxRuntime.jsx('p', { children: r.basis}), jsxRuntime.jsx(dataApp.DataTable, { rows: r.rows, columns: columns, searchable: false, caption: r.title,} ), jsxRuntime.jsxs('p', { className: "deep-rank-price", children: ["榜首价格：", r.firstPrice]}), jsxRuntime.jsx('p', { className: "deep-caveat", children: r.caveat}), jsxRuntime.jsx(SourceLinks, { ids: [r.source],} )]}, r.id))
    , missing.map(m => jsxRuntime.jsxs('section', { className: "deep-missing", children: [jsxRuntime.jsxs('strong', { children: [marketName(m), " · 未取得可信的同类销量前三"  ]}), jsxRuntime.jsxs('p', { children: [category.full, "的同周期售出件数与完整分类排名未获取。上方是按功能选择的对标样本，不能改名为“销量前三”。"]})]}, m))
  ]});

}





function CompetitorDepth({ initialCategory = 'touch', onCategoryChange }) {

  const { snapshot } = dataApp.useDataApp();

  const [categoryId, setCategoryId] = react.useState(initialCategory);

  const [market, setMarket] = react.useState('all');

  const [reviewTone, setReviewTone] = react.useState('all');

  const [sampleProduct, setSampleProduct] = react.useState('all');

  const [sampleSearch, setSampleSearch] = react.useState('');

  const [dossierProduct, setDossierProduct] = react.useState('');

  const rows = key => snapshot.queries[key].rows;

  const profiles = categoryIds.map(id => rows(`v5_profile_${id}`)[0]);

  const profile = profiles.find(c => c.id === categoryId);

  const inMarket = r => market === 'all' || r.market === market;

  const allProducts = rows(`v5_products_${categoryId}`);

  const products = allProducts.filter(inMarket);

  const allReviews = rows(`v5_reviews_${categoryId}`);

  const reviews = allReviews.filter(r => inMarket(r) && (reviewTone === 'all' || (reviewTone === 'positive' ? r.sentiment === '正向' : r.sentiment !== '正向')));

  const rankRows = rows(`v5_ranks_${categoryId}`).filter(inMarket);
  const brandRows = rows(`v7_brands_${categoryId}`);

  const readRows = rows(`v7_read_${categoryId}`);

  const allSamples = rows(`v5_samples_${categoryId}`);

  const marketSamples = allSamples.filter(inMarket);

  const samples = marketSamples.filter(s => (sampleProduct === 'all' || s.product === sampleProduct) && (!sampleSearch || `${s.excerpt} ${s.spec} ${s.productName} ${s.id}`.toLowerCase().includes(sampleSearch.toLowerCase())));

  const sampleMap = Object.fromEntries(allSamples.map(s => [s.id, s]));

  const audit = rows('v5_audit').filter(a => a.category === categoryId && inMarket(a));

  const stats = rows('v5_summary')[0];

  const dossierStats = rows('v6_coverage')[0];

  const openDossier = id => { setDossierProduct(id); requestAnimationFrame(() => document.getElementById('deep-dossier')?.scrollIntoView({ block: 'start' })); };

  const openDossierReviews = id => { setSampleProduct(id); setSampleSearch(''); requestAnimationFrame(() => document.getElementById('deep-samples')?.scrollIntoView({ block: 'start' })); };

  const productQuery = `v5_products_${categoryId}`;

  const profileQuery = `v5_profile_${categoryId}`;

  const categoryNumber = categoryIds.indexOf(categoryId) + 1;

  const sectionNumber = id => {

    const section = depthSections.find(s => s.id === `deep-${id}`);

    return section.appendix ? `附录 ${section.number}.${categoryNumber}` : `2.${categoryNumber}.${section.number}`;

  };

  const matrix = profile.features.map((feature, index) => Object.fromEntries([['feature', feature], ['ourPlan', profile.plan[index]], ...products.map(p => [p.id, p.features[index]])]));

  const matrixColumns = [{ key: 'feature', label: '功能 / 产品' }, { key: 'ourPlan', label: '我们 · BP规划', renderCell: value => jsxRuntime.jsx(Mark, { value: value,} ) }, ...products.map(p => ({ key: p.id, label: p.short, renderCell: value => jsxRuntime.jsx(Mark, { value: value,} ) }))];

  const activeSourceIds = [...new Set([...profile.refs, ...allProducts.flatMap(p => p.refs), ...allReviews.flatMap(r => r.refs), ...allSamples.map(s => s.source), ...brandRows.flatMap(r => r.refs), ...rankRows.map(r => r.source)])].filter(id => sourceMap[id]);

  const resetSamples = () => { setSampleProduct('all'); setSampleSearch(''); };

  return jsxRuntime.jsxs('section', { className: "competitor-depth", children: [
    jsxRuntime.jsxs('div', { className: "deep-hero", children: [
      jsxRuntime.jsx('span', { className: "deep-kicker", children: "同品类 · 具体型号 · 用户体验与操作证据 / 2026.11.06"      })
      , jsxRuntime.jsx(Copy, { id: "headline", value: '## 五类产品，各自和谁竞争？\n\n**先看同类产品解决什么，再看价格、销售证据和真实使用阻力。** 中国与海外分别比较；海外以美国市场为主。手触摸式以同形态产品对标；整椅仅作为腰靠配件的技术参照。\n\n**先读这五句：**\n\n1. 触控类卖的是“传感器＋课程”订阅：竞争在启动负担，不在测量精度。\n2. 佩戴提醒已卷到价格：误报和“戴不住”决定留用。\n3. 鼠标腕托低科技高销量：“感知功能”还没被证明有人买。\n4. 腰靠的“压力自适应”没人做实；米乔电动顶托已占住“电动＋顶托”认知——这是我们唯一能占的空白。\n5. 颈贴共性是“温热＋无线”：赢在热对位置、戴着能工作。\n\n每类顶部的“先看结论”给出六个问题的速读。',} )
      , jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: "v5-summary", queryId: "v5_summary", title: "研究证据覆盖", kind: "figure", displayRows: [stats], sourceRows: [stats], variant: "plain", children: 
        jsxRuntime.jsxs('div', { className: "deep-stats", 'data-reviewed-rows': true, children: [jsxRuntime.jsxs('span', { children: [jsxRuntime.jsx('b', { children: stats.productCount}), "具体型号 / 商品"  ]}), jsxRuntime.jsxs('span', { children: [jsxRuntime.jsx('b', { children: stats.pictureCount}), "张同来源图片"]}), jsxRuntime.jsxs('span', { children: [jsxRuntime.jsx('b', { children: stats.sampleCount}), "条清理后评论记录"]}), jsxRuntime.jsxs('span', { children: [jsxRuntime.jsx('b', { children: stats.reviewProductCount}), "个有评价的商品链接"]})]})
      })
      , jsxRuntime.jsx('p', { className: "deep-status-note", children: "已登录电商采集。评论不等于独立买家数；销量榜仅在标明的平台、词项和时间范围内成立。参数为商家声称，BP为研发规划。"})
      , jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: "v6-coverage", queryId: "v6_coverage", title: "型号资料与操作证据", kind: "figure", displayRows: [dossierStats], sourceRows: [dossierStats], variant: "plain", children: jsxRuntime.jsxs('div', { className: "dossier-version-note", 'data-reviewed-rows': true, children: [jsxRuntime.jsxs('p', { children: [jsxRuntime.jsxs('b', { children: [dossierStats.models, "款型号资料卡"]}), jsxRuntime.jsx('br', {}), dossierStats.detailImages, "张细节图 · "  , dossierStats.officialGuides, "份官方说明书 · "  , dossierStats.officialVideoEntries, "个官方视频入口 · "  , dossierStats.storeVideoEntries, "个店铺演示入口 · "  , dossierStats.additionalReviews, "条颈带资料卡案例（已计入评论库）。视频未逐帧审阅。"]}), jsxRuntime.jsx('a', { href: "#deep-dossier", children: "直接看优势如何实现 ↓" })]})})
    ]})
    , jsxRuntime.jsxs('div', { className: "deep-controls", children: [
      jsxRuntime.jsx('span', { className: "deep-control-label", children: "当前研究品类"})
      , jsxRuntime.jsx('div', { className: "deep-category-buttons", role: "group", 'aria-label': "深挖产品类别", children: profiles.map(c => jsxRuntime.jsx('button', { type: "button", 'aria-pressed': categoryId === c.id, onClick: () => {setCategoryId(c.id);onCategoryChange?.(c.id);setReviewTone('all');resetSamples();}, children: c.label}, c.id))})
      , jsxRuntime.jsx(dataApp.SegmentedControl, { ariaLabel: "深挖市场范围", value: market, options: [{ value: 'all', label: '中国 + 海外' }, { value: 'china', label: '只看中国' }, { value: 'overseas', label: '只看海外' }], onChange: v => { setMarket(v); resetSamples(); },} )
    ]})
    , jsxRuntime.jsxs('section', { id: "deep-read", className: "deep-section deep-read", children: [
      jsxRuntime.jsx(Copy, { id: `${categoryId}-read`, value: '## 先看结论 / 本类要点\n\n**结论在前，证据在后。** 每类先回答六个问题：价格结构、迭代规律、买家最在意什么、便携与外观、对本项目的含义；下方各节与附录给出支撑记录。未取得评论的型号如实留空，不作推测。'} )
      , jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: `v7-read-${categoryId}`, queryId: `v7_read_${categoryId}`, title: `${profile.full}要点速读`, kind: "figure", displayRows: readRows, sourceRows: readRows, variant: "plain", children: jsxRuntime.jsx('div', { className: "deep-read-grid", 'data-reviewed-rows': true, children: readRows.map(r => jsxRuntime.jsxs('article', { children: [jsxRuntime.jsx('span', { children: r.label}), jsxRuntime.jsx('p', { children: r.text}), jsxRuntime.jsx(SourceLinks, { ids: r.refs,} )]}, r.id))})})
    ]})
    , jsxRuntime.jsxs('section', { id: "deep-scope", children: [jsxRuntime.jsxs('span', { className: "report-section-number", children: [sectionNumber('scope'), "　对标范围"]})
    , jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: `v5-scope-${categoryId}`, queryId: profileQuery, title: `${profile.full} · 对标范围`, kind: "figure", displayRows: [profile], sourceRows: [profile], variant: "plain", children: 
      jsxRuntime.jsxs('div', { className: "deep-category-intro", 'data-reviewed-rows': true, children: [jsxRuntime.jsxs('span', { className: "deep-kicker", children: ["产品用途 · "  , profile.task]}), jsxRuntime.jsx('h2', { children: profile.headline}), jsxRuntime.jsxs('p', { className: "deep-excluded", children: ["品类边界：", profile.excluded]}), jsxRuntime.jsxs('div', { className: "deep-market-notes", children: [jsxRuntime.jsxs('p', { children: [jsxRuntime.jsx('b', { children: "中国"}), profile.china]}), jsxRuntime.jsxs('p', { children: [jsxRuntime.jsx('b', { children: "海外"}), profile.overseas]})]}), jsxRuntime.jsxs('div', { className: "deep-bp", children: [jsxRuntime.jsx('h3', { children: "本项目配置 · BP规划"  }), jsxRuntime.jsx('dl', { children: Object.entries(profile.ourSpecs).map(([k,v]) => jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: k}), jsxRuntime.jsx('dd', { children: v})]}, k))})]})]})
    })
    ]})
    , jsxRuntime.jsxs('section', { id: "deep-products", className: "deep-section", children: [
      jsxRuntime.jsx(Copy, { id: `${categoryId}-products`, number: sectionNumber('products'), value: '## 02 / 产品照片、具体配置与用户定位\n\n参数直接列在型号下。目标用户是**品牌定位或样本自述**；缺失参数写明待核，图片中的广告宣称不作为实测结论。',} )
      , jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: `v5-gallery-${categoryId}`, queryId: productQuery, title: `${profile.full}型号参数`, kind: "figure", displayRows: products, sourceRows: products, variant: "plain", children: jsxRuntime.jsx(ProductGallery, { products: products, onDossier: openDossier,} )})
      , market === 'china' && !products.length && jsxRuntime.jsx('p', { className: "deep-missing", children: "目前仅核到进口销售线索，未找到足以列入主矩阵的三款国产同类。海外直接对标和中国检索边界均在本页保留。"})
    ]})
    , jsxRuntime.jsxs('section', { id: "deep-features", className: "deep-section", children: [
      jsxRuntime.jsx(Copy, { id: `${categoryId}-matrix`, number: sectionNumber('features'), value: '## 03 / 同一张功能表，对照我们的BP\n\n“？”表示证据不足；“拟”表示我们计划做。**没有把规划功能写成已经领先。** 手机可左右滑动，数值配置见上方型号卡。',} )
      , jsxRuntime.jsx('div', { className: "deep-legend", children: Object.entries(statusLabels).map(([status, label]) => jsxRuntime.jsxs('span', { className: status, children: [jsxRuntime.jsx('b', { children: label}), statusNames[status]]}, status))})
      , jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: `v5-matrix-${categoryId}`, queryId: productQuery, queryIds: [productQuery, profileQuery], sourceRowsByQuery: { [productQuery]: products, [profileQuery]: [profile] }, title: `${profile.full}功能矩阵`, kind: "table", displayRows: matrix, children: jsxRuntime.jsx('div', { className: "deep-matrix", children: jsxRuntime.jsx(dataApp.DataTable, { rows: matrix, columns: matrixColumns, caption: `${profile.full}功能对照，左侧紫色列为BP规划`, searchable: false,} )})})
    ]})
    , jsxRuntime.jsxs('section', { id: "deep-sales", className: "deep-section", children: [
      jsxRuntime.jsx(Copy, { id: `${categoryId}-sales`, number: sectionNumber('sales'), value: '## 01 / 谁卖得多，榜首多少钱\n\n“人收货”“近月购买量”“畅销榜名次”和“评论数”分别展示。**有排名范围才写TOP；父商品含多款时，不能声称某个子型号销量第一。**',} )
      , jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: `v5-ranks-${categoryId}`, queryId: `v5_ranks_${categoryId}`, title: `${profile.full}排序留证`, kind: "table", displayRows: rankRows, sourceRows: rankRows, variant: "plain", children: jsxRuntime.jsx(RankPanel, { category: profile, rows: rankRows, market: market,} )})
    ]})
    , jsxRuntime.jsxs('section', { id: "deep-prices", className: "deep-section", children: [
      jsxRuntime.jsx(Copy, { id: `${categoryId}-price`, number: sectionNumber('prices'), value: '## 04 / 价格、跨维度对照与品牌谱系\n\n区间只描述本次选取样本。中国人民币、海外美元分开；搜索券价、父链接起价、售罄价与实际结算价不能混为一谈。跨维度对照把购买量、便携、舒适、外观并排，口径沿用型号卡；品牌谱系统计同品牌多型号与几代迭代，家族型号未逐台采集评论处已注明。',} )
      , jsxRuntime.jsxs(dataApp.DataComponent, { headingLevel: 3, id: `v5-prices-${categoryId}`, queryId: productQuery, title: `${profile.full}报价条件`, kind: "table", displayRows: products, sourceRows: products, children: [jsxRuntime.jsx(PriceReadout, { products: products,} ), jsxRuntime.jsx(dataApp.DataTable, { rows: products, searchable: false, caption: "逐型号价格", columns: [{ key:'name',label:'型号' },{ key:'price',label:'展示价',renderCell:(_,p)=>jsxRuntime.jsx('b', { children: money(p)}) },{ key:'priceType',label:'口径' },{ key:'priceNote',label:'规格 / 优惠 / 冲突' }],} )]})
      , jsxRuntime.jsxs(dataApp.DataComponent, { headingLevel: 3, id: `v5-dims-${categoryId}`, queryId: productQuery, title: `${profile.full}跨维度对照`, kind: "table", displayRows: products, sourceRows: products, children: [jsxRuntime.jsx(dataApp.DataTable, { rows: products, searchable: false, pageSize: 20, caption: "跨维度对照：购买量、便携、舒适、外观与功能（口径沿用型号卡）", columns: [{ key:'name',label:'型号' },{ key:'price',label:'展示价 · 口径',renderCell:(_,p)=>jsxRuntime.jsxs('span',{children:[jsxRuntime.jsx('b',{children:money(p)}),' · ',p.priceType]}) },{ key:'signal',label:'购买量信号' },{ key:'portability',label:'便携 / 收纳' },{ key:'comfort',label:'舒适性证据' },{ key:'appearance',label:'外观' },{ key:'overlap',label:'功能要点 / 竞争哪项' }],} )]})
      , jsxRuntime.jsxs(dataApp.DataComponent, { headingLevel: 3, id: `v5-brands-${categoryId}`, queryId: `v7_brands_${categoryId}`, title: `${profile.full}品牌谱系`, kind: "table", displayRows: brandRows, sourceRows: brandRows, children: [jsxRuntime.jsx(dataApp.DataTable, { rows: brandRows, searchable: false, pageSize: 20, caption: "同品牌多型号与几代迭代（家族型号以各自来源为准，未逐台采集评论处已注明）", columns: [{ key:'brand',label:'品牌 · 型号与代际',renderCell:(v,r)=>jsxRuntime.jsxs('span',{children:[jsxRuntime.jsx('b',{children:v}),jsxRuntime.jsx('br',{}),r.models]}) },{ key:'price',label:'价格演进' },{ key:'features',label:'功能迭代' },{ key:'appearance',label:'外观变化' },{ key:'comfort',label:'舒适性证据' },{ key:'reviews',label:'评论与销量信号' }],} )]})
    ]})
    , jsxRuntime.jsxs('section', { id: "deep-reviews", className: "deep-section", children: [
      jsxRuntime.jsx(Copy, { id: `${categoryId}-reviews`, number: sectionNumber('reviews'), value: '## 05 / 为什么买，为什么不愿继续用\n\n归纳来自下方可追溯的具体评价。**不是随机抽样，不计算总体好评率或故障率。** 对产品疗效和个人健康经历的描述只视为买家自述。',} )
      , jsxRuntime.jsx(ReviewAnalysis, { categoryId: categoryId, market: market, allSamples: allSamples,} )
      , jsxRuntime.jsxs('details', { className: "review-case-archive", children: [jsxRuntime.jsx('summary', { children: "评价主题案例详录"})
      , jsxRuntime.jsx(dataApp.SegmentedControl, { ariaLabel: "评价观察筛选", value: reviewTone, options: [{value:'all',label:'全部观察'},{value:'positive',label:'正向体验'},{value:'concerns',label:'顾虑 / 混合体验'}], onChange: setReviewTone,} )
      , jsxRuntime.jsxs(dataApp.DataComponent, { headingLevel: 3, id: `v5-reviews-${categoryId}`, queryId: `v5_reviews_${categoryId}`, title: `${profile.full}评价主题`, kind: "figure", displayRows: reviews, sourceRows: reviews, variant: "plain", children: [jsxRuntime.jsx('div', { className: "deep-review-grid", 'data-reviewed-rows': true, children: reviews.map(r => jsxRuntime.jsxs('article', { className: "deep-review", children: [jsxRuntime.jsxs('div', { className: "deep-product-tags", children: [jsxRuntime.jsx('span', { children: r.sentiment}), jsxRuntime.jsx('span', { children: marketName(r.market)})]}), jsxRuntime.jsx('h3', { children: r.title}), jsxRuntime.jsx('small', { children: r.product}), jsxRuntime.jsx('p', { className: "deep-review-summary", children: r.summary}), jsxRuntime.jsxs('dl', { children: [jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "购买 / 停用原因"  }), jsxRuntime.jsx('dd', { children: r.motive})]}), jsxRuntime.jsxs('div', { children: [jsxRuntime.jsx('dt', { children: "对我们意味着什么"}), jsxRuntime.jsx('dd', { children: r.implication})]})]}), jsxRuntime.jsxs('details', { children: [jsxRuntime.jsxs('summary', { children: ["查看 " , r.sampleIds.length, " 条支撑摘录" ]}), r.sampleIds.map(id => {const s=sampleMap[id];return jsxRuntime.jsxs('div', { className: "deep-excerpt", children: [jsxRuntime.jsxs('b', { children: [id, " · "  , s.date]}), jsxRuntime.jsx('p', { children: s.excerpt}), jsxRuntime.jsxs('small', { children: [s.spec, " · "  , s.kind, s.truncated ? ' · 可能截断' : '']})]}, id);})]}), jsxRuntime.jsx(SourceLinks, { ids: r.refs,} )]}, r.id))}), !reviews.length && jsxRuntime.jsxs('div', { className: "deep-missing", 'data-reviewed-rows': true, children: [jsxRuntime.jsx('strong', { children: "这个筛选范围尚未取得可归属的评价主题"}), jsxRuntime.jsx('p', { children: "不能用其他品类评价、商家卖点或推测代替买家反馈。"})]})]})
      ]})
      , jsxRuntime.jsx('div', { className: "deep-demographics", children: jsxRuntime.jsx(Copy, { id: `${categoryId}-portrait`, value: '### 用户画像：将购买者和使用者分开\n\n**能支持的画像：** 评论明确提到的办公、学校、驾驶、通勤、送家人、复购等任务；这些只代表样本出现过。品牌“面向儿童”不等于买家年龄是儿童。\n\n**目前没有的分布：** 买家年龄、性别、城市占比。淘宝账号、页面收货地址、语言不能代替人口统计，因此不画虚构年龄或地区图。访谈时应另问每天使用时长、原有设备、预算、弃用原因与购买者/使用者关系。',} )})
    ]})
    , jsxRuntime.jsxs('section', { id: "deep-decisions", className: "deep-section", children: [
      jsxRuntime.jsx(Copy, { id: `${categoryId}-decisions`, number: sectionNumber('decisions'), value: '## 07 / 我们的差异，先验证哪一项\n\n以下是基于竞品和评论的**判断与验证建议**。便携、沿用原椅、可充电等已有竞品实现；应比较具体改善和额外负担。',} )
      , jsxRuntime.jsxs(dataApp.DataComponent, { headingLevel: 3, id: `v5-decisions-${categoryId}`, queryId: profileQuery, title: `${profile.full}差异假设`, kind: "figure", displayRows: [profile], sourceRows: [profile], variant: "plain", children: [jsxRuntime.jsxs('div', { className: "deep-decision-grid", 'data-reviewed-rows': true, children: [jsxRuntime.jsxs('section', { children: [jsxRuntime.jsx('span', { children: "01 / 候选优势"  }), jsxRuntime.jsx('h3', { children: "什么值得验证"}), jsxRuntime.jsx('p', { children: profile.advantage})]}), jsxRuntime.jsxs('section', { children: [jsxRuntime.jsx('span', { children: "02 / 相应代价"  }), jsxRuntime.jsx('h3', { children: "什么可能抵消价值"}), jsxRuntime.jsx('p', { children: profile.cost})]}), jsxRuntime.jsxs('section', { className: "deep-test", children: [jsxRuntime.jsx('span', { children: "03 / 验证优先级"  }), jsxRuntime.jsx('h3', { children: "先比什么，再测什么"}), jsxRuntime.jsx('p', { children: profile.test})]})]}), jsxRuntime.jsxs('div', { className: "deep-discussion", 'data-reviewed-rows': true, children: [jsxRuntime.jsx('b', { children: "关键决策问题"}), jsxRuntime.jsx('p', { children: profile.discussion})]})]})
    ]})
    , jsxRuntime.jsx(ProductDossier, { categoryId: categoryId, products: products, dossiers: rows(`v6_dossiers_${categoryId}`), selectedId: dossierProduct, onSelect: setDossierProduct, samples: allSamples, extraReviews: rows('v6_new_reviews'), onReviews: openDossierReviews,} )
    , jsxRuntime.jsxs('section', { id: "deep-samples", className: "deep-section report-appendix" , children: [
      jsxRuntime.jsx(Copy, { id: `${categoryId}-samples`, number: sectionNumber('samples'), value: '## 06 / 评价摘录与采样记录\n\n按型号筛选，或搜索“续航、异味、提醒”等关键词。正文匿名化；部分页面和接口会截断长评。米乔所购规格含“晒单20元奖励”，已单列偏差。',} )
      , jsxRuntime.jsxs('div', { className: "deep-sample-controls", children: [jsxRuntime.jsxs('label', { children: ["具体商品", jsxRuntime.jsxs('select', { 'aria-label': "评价商品", value: sampleProduct, onChange: e=>setSampleProduct(e.target.value), children: [jsxRuntime.jsx('option', { value: "all", children: "全部已采商品"}), [...new Map(marketSamples.map(s=>[s.product,s.productName])).entries()].map(([id,name])=>jsxRuntime.jsx('option', { value: id, children: name}, id))]})]}), jsxRuntime.jsxs('label', { children: ["搜索评价", jsxRuntime.jsx('input', { 'aria-label': "搜索评价", value: sampleSearch, onChange: e=>setSampleSearch(e.target.value), placeholder: "例如：充电、提醒、移位",} )]})]})
      , jsxRuntime.jsxs(dataApp.DataComponent, { headingLevel: 3, id: `v5-samples-${categoryId}`, queryId: `v5_samples_${categoryId}`, title: `${profile.full}匿名评论摘录`, kind: "table", displayRows: samples, sourceRows: allSamples, children: [
        jsxRuntime.jsxs('p', { 'data-reviewed-rows': true, className: "deep-sample-count", children: ["当前筛选 " , samples.length, " 条；本市场共 "  , marketSamples.length, " 条。" ]})
        , jsxRuntime.jsx(dataApp.DataTable, { rows: samples, searchable: false, caption: "匿名评论摘录", columns: [{key:'id',label:'编号 / 日期',renderCell:(v,s)=>jsxRuntime.jsxs('span', { children: [v, jsxRuntime.jsx('br', {}), jsxRuntime.jsx('small', { children: s.date})]})},{key:'productName',label:'商品 / 所购规格',renderCell:(v,s)=>jsxRuntime.jsxs('span', { children: [v, jsxRuntime.jsx('br', {}), jsxRuntime.jsx('small', { children: s.spec})]})},{key:'excerpt',label:'评价摘录',renderCell:(v,s)=>jsxRuntime.jsxs('span', { className: "deep-sample-text", children: [v, s.truncated && jsxRuntime.jsx('small', { children: "（正文或规格可能截断）"})]})},{key:'kind',label:'验证与边界',renderCell:(v,s)=>jsxRuntime.jsxs('span', { children: [v, jsxRuntime.jsx(SourceLinks, { ids: [s.source],} )]})}],}, [categoryId,market,sampleProduct,sampleSearch].join('|') )
      ]})
      , jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: `v5-audit-${categoryId}`, queryId: "v5_audit", title: `${profile.full}清洗记录`, kind: "table", displayRows: audit, sourceRows: audit, children: jsxRuntime.jsxs('details', { className: "deep-method", children: [jsxRuntime.jsx('summary', { children: "展开采样范围、清洗数量与缺口"}), jsxRuntime.jsx(dataApp.DataTable, { rows: audit, searchable: false, caption: "原始记录与保留记录", columns: [{key:'productName',label:'具体商品'},{key:'raw',label:'读取记录'},{key:'kept',label:'保留记录'},{key:'method',label:'口径 / 剔除 / 限制'}],} )]})})
    ]})
    , jsxRuntime.jsxs('details', { id: "deep-source-directory", className: "deep-method deep-source-directory" , children: [jsxRuntime.jsxs('summary', { children: [jsxRuntime.jsxs('span', { className: "report-figure-number", children: ["附录 C." , categoryNumber]}), "本类来源与原始证据 · "  , activeSourceIds.length, "项"]}), jsxRuntime.jsx('p', { children: "读取于2026-11-06（美国西岸），中国当地页面已进入11月7日。网页内容可能更新。型号、参数与评价均以各项来源所列范围为准。"}), jsxRuntime.jsx('ul', { children: activeSourceIds.map(id=>jsxRuntime.jsxs('li', { children: [jsxRuntime.jsxs('a', { href: sourceMap[id].url, target: "_blank", rel: "noopener noreferrer" , children: [id, " · "  , sourceMap[id].title, " ↗" ]}), jsxRuntime.jsxs('span', { children: [sourceMap[id].kind, " · "  , sourceMap[id].scope]})]}, id))})]})
  ]});

}

const assets = { bp, hbada, libernovo, osim };

const sources = Object.fromEntries(value$2.sources.map(source => [source.id, source]));

const narrativeProps = { sourcePreviews: value$2.sourcePreviews };



function EvidenceBlock({ block }) {

  const { snapshot } = dataApp.useDataApp();

  const rows = snapshot.queries[block.queryId].rows;

  if (block.kind === "chart") return jsxRuntime.jsx(dataApp.EvidenceChart, { id: block.id, queryId: block.queryId,

    title: block.title, rows: rows, sourceRows: rows, spec: block.spec,

    height: block.height, description: block.description,} );

  if (block.kind === "table") {

    const columns = block.columns.map(column => column.link ? { ...column,

      renderCell: value => jsxRuntime.jsx('a', { href: value, target: "_blank", rel: "noopener noreferrer" , children: "官网／原文 ↗" })

    } : { ...column, renderCell: value => jsxRuntime.jsx('span', { className: "research-cell", children: value}) });

    const caveat = snapshot.queries[block.queryId].source.caveats.join("\n\n");

    return jsxRuntime.jsxs(dataApp.DataComponent, { headingLevel: 3, id: block.id, queryId: block.queryId, title: block.title,

      kind: "table", displayRows: rows, sourceRows: rows, children: [
      jsxRuntime.jsx(dataApp.DataTable, { rows: rows, columns: columns, caption: block.title, searchable: false,} )
      , caveat && jsxRuntime.jsx(dataApp.RichNarrative, { id: `${block.id}:caveat`, value: caveat, ...narrativeProps,} )
    ]});

  }

  if (block.kind === "image") return jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: block.id, queryId: block.queryId,

    title: "BP五型产品概念", kind: "figure", displayRows: rows, sourceRows: rows, children: 
    jsxRuntime.jsxs('figure', { className: "research-bp", 'data-reviewed-rows': true, children: [
      jsxRuntime.jsx('img', { src: assets[block.asset], alt: "用户BP第7页：五类终端的产品外观概念",} )
      , jsxRuntime.jsx('figcaption', { children: jsxRuntime.jsx(dataApp.RichNarrative, { id: `${block.id}:caption`, value: block.caption,} )})
    ]})
  });

  return jsxRuntime.jsx(dataApp.DataComponent, { headingLevel: 3, id: block.id, queryId: block.queryId, title: "主要竞品外观参照",

    kind: "figure", displayRows: rows, sourceRows: rows, children: 
    jsxRuntime.jsx('div', { className: "research-gallery", 'data-reviewed-rows': true, children: 
      block.items.map(item => jsxRuntime.jsxs('figure', { children: [
        jsxRuntime.jsx('a', { href: sources[item.source].url, target: "_blank", rel: "noopener noreferrer" , children: 
          jsxRuntime.jsx('img', { src: assets[item.asset], alt: `${item.title} 官方产品图`,} )
        })
        , jsxRuntime.jsx('figcaption', { children: jsxRuntime.jsx(dataApp.RichNarrative, { id: `${block.id}:${item.asset}`, ...narrativeProps,

          value: `**[${item.title}](${sources[item.source].url})**\n\n${item.caption}。图片只说明外观，不代表本报告完成性能验证。`,} )
        })
      ]}, item.asset))
    })
  });

}



function ResearchBody() {

  const { snapshot } = dataApp.useDataApp();

  return jsxRuntime.jsx(jsxRuntime.Fragment, { children: 
    jsxRuntime.jsx(dataApp.SortableRegion, { id: "research:sections", variant: "stack", className: "report-sortable-sections", authoredOrder: value$2.sections.map(s => `research:${s.id}`), children: 
      value$2.sections.map((section, index) => jsxRuntime.jsx(dataApp.SortableItem, { id: `research:${section.id}`, children: 
        jsxRuntime.jsxs('section', { id: `section-${section.id}`, className: "research-chapter", children: [
          jsxRuntime.jsx(dataApp.ReportSection, { id: `research:${section.id}`, queryId: section.queryId, title: section.title,

            sourceRows: snapshot.queries[section.queryId].rows, showHeading: false, children: 
            jsxRuntime.jsx(dataApp.RichNarrative, { className: "report-prose", id: `research:${section.id}:text`, value: index < 23 ? numberHeading(section.body, `3.${index + 1}`) : section.body, ...narrativeProps,} )
          })
          , section.blocks.map(block => jsxRuntime.jsx(EvidenceBlock, { block: block,}, block.id ))
        ]})
      }, section.id))
    })
  });

}



function ReportContent() {

  const [view, setView] = react.useState('overview');

  const [category, setCategory] = react.useState('touch');

  const navigate = (next, target = 'investor-view-selector') => {

    setView(next);

    requestAnimationFrame(() => {

      const element = document.getElementById(target);

      if (element?.tagName === 'DETAILS') element.open = true;

      element?.scrollIntoView({ block: 'start' });

    });

  };

  const openResearch = section => {

    navigate('research', `section-${section}`);

  };

  const openScenario = () => {

    navigate('scenario');

  };

  const openCategory = id => {

    setCategory(id);

    navigate('depth');

  };

  const part = reportParts.find(item => item.id === view);

  return jsxRuntime.jsxs('article', { className: "report-content research-report report-layout-v7"  , children: [
    jsxRuntime.jsx(ReportHeader, { preparedOn: value$2.subtitle,} )
    , jsxRuntime.jsxs('div', { className: "report-reading-layout", children: [
    jsxRuntime.jsx(ReportNavigation, { view: view, category: category, onNavigate: navigate,} )
    , jsxRuntime.jsxs('div', { className: "report-document", children: [
    jsxRuntime.jsxs('div', { className: "investor-view-controls", id: "investor-view-selector", children: [
      jsxRuntime.jsxs('div', { className: "report-part-heading", children: [jsxRuntime.jsxs('span', { children: ["第", part.number, "部分"]}), jsxRuntime.jsx('h2', { children: part.label})]})
      , jsxRuntime.jsx('p', { children: view === 'overview' ? '产品定义、使用场景、候选优势与决策依据。' : view === 'depth' ? '同类产品、参数配置、买家评价，以及结构图、官方教程与优势依据。' : view === 'research' ? '行业、渠道、技术、经济性与研究来源；整椅作为技术参照。' : 'BP经营假设与敏感性分析；不代表实际业绩或完整现金流预测。'})
    ]})
    , view === 'overview' ? jsxRuntime.jsx(PartnerBrief, { onCategory: openCategory, onResearch: openResearch, onScenario: openScenario,} ) : view === 'depth' ? jsxRuntime.jsx(CompetitorDepth, { initialCategory: category, onCategoryChange: setCategory,} ) : view === 'research' ? jsxRuntime.jsx(ResearchBody, {} ) : jsxRuntime.jsx(ScenarioView, {} )
    ]})
    ]})
  ]});

}

exports.DashboardContent = DashboardContent;
exports.ReportContent = ReportContent;

})(__dataAuthoredModule,__dataAuthoredModule.exports,__dataAuthoredRequire);
return {DashboardContent:__dataAuthoredModule.exports.DashboardContent,ReportContent:__dataAuthoredModule.exports.ReportContent};
})(runtime, snapshot)});
} catch(error) { status.fail(error,stage); }
})();