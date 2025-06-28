import React, { useState, useEffect } from 'react';
import {
  Shield,
  AlertTriangle,
  Activity,
  Globe,
  Brain,
  BarChart3,
  LineChart as LineChartIcon,
  Network,
  ShieldAlert,
  Zap,
  Server,
  Lock,
  UserCheck,
  Wifi,
  Bug,
  FileWarning,
  KeyRound,
  Webhook,
  ShieldQuestion,
  Siren,
  Radio,
  Database,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Scatter,
  ScatterChart,
  ZAxis,
  FunnelChart, 
  Funnel,
  RadialBarChart, 
  RadialBar,
  Treemap, 
} from 'recharts';

// Enhanced data generators
const generateTimeSeriesData = (points: number) => {
  return Array.from({ length: points }, (_, i) => ({
    time: new Date(Date.now() - (points - i) * 1000).toISOString().substr(11, 8),
    value: Math.floor(Math.random() * 100),
    predictedValue: Math.floor(Math.random() * 100),
  }));
};

const generateAttackData = () => ({
  malware: Math.floor(Math.random() * 1000),
  ddos: Math.floor(Math.random() * 800),
  phishing: Math.floor(Math.random() * 600),
  ransomware: Math.floor(Math.random() * 400),
  Deepfake: Math.floor(Math.random() * 300),
  Aadhaar: Math.floor(Math.random() * 450),
  sqlinjection: Math.floor(Math.random() * 550),
  bruteforce: Math.floor(Math.random() * 350),
});

const generateRadarData = (type: string) => [
  { subject: 'Virus', A: Math.random() * 100 },
  { subject: 'Worm', A: Math.random() * 100 },
  { subject: 'Torjan', A: Math.random() * 100 },
  { subject: 'Spyware', A: Math.random() * 100 },
  { subject: 'Adware', A: Math.random() * 100 },
];

const generateScatterData = (type: string) => {
  return Array.from({ length: 20 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: Math.random() * 100,
  }));
};

const ATTACK_COLORS = {
  malware: '#FF4842',
  ddos: '#FFC107',
  phishing: '#00AB55',
  ransomware: '#2065D1',
  Deepfake: '#7928CA',
  Aadhaar: '#FF6B6B',
  sqlinjection: '#4CAF50',
  bruteforce: '#FF9800',
};

const ATTACK_ICONS = {
  malware: Bug,
  ddos: Wifi,
  phishing: FileWarning,
  ransomware: Lock,
  Deepfake: ShieldQuestion,
  Aadhaar: Webhook,
  sqlinjection: Database,
  bruteforce: KeyRound,
};

function App() {
  const [threatScore, setThreatScore] = useState(75);
  const [threatLevel, setThreatLevel] = useState('HIGH');
  const [selectedAttackType, setSelectedAttackType] = useState('malware');
  const [timeSeriesData, setTimeSeriesData] = useState(generateTimeSeriesData(20));
  const [attackData, setAttackData] = useState(generateAttackData());
  const [radarData, setRadarData] = useState(generateRadarData(selectedAttackType));
  const [scatterData, setScatterData] = useState(generateScatterData(selectedAttackType));
  const [showAIInsights, setShowAIInsights] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newScore = Math.floor(Math.random() * 100);
      setThreatScore(newScore);
      setThreatLevel(newScore > 75 ? 'HIGH' : newScore > 50 ? 'MEDIUM' : 'LOW');
      
      setTimeSeriesData(prev => [
        ...prev.slice(1),
        { 
          time: new Date().toISOString().substr(11, 8), 
          value: newScore,
          predictedValue: Math.min(100, newScore + Math.floor(Math.random() * 20)),
        }
      ]);
      
      setAttackData(generateAttackData());
      setRadarData(generateRadarData(selectedAttackType));
      setScatterData(generateScatterData(selectedAttackType));
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedAttackType]);

  const pieData = Object.entries(attackData).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  const getAttackTrendChart = () => {
    switch (selectedAttackType) {
      case 'malware':
        return (
          <RadarChart outerRadius={120} width={300} height={300} data={radarData}>
            <PolarGrid stroke="#234E7E" />
            <PolarAngleAxis dataKey="subject" stroke="#fff" />
            <PolarRadiusAxis stroke="#fff" />
            <Radar dataKey="A" stroke={ATTACK_COLORS[selectedAttackType]} fill={ATTACK_COLORS[selectedAttackType]} fillOpacity={0.6} />
          </RadarChart>
        );
      case 'ddos':
        return (
          <AreaChart data={timeSeriesData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={ATTACK_COLORS[selectedAttackType]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={ATTACK_COLORS[selectedAttackType]} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#fff" />
            <YAxis stroke="#fff" />
            <CartesianGrid strokeDasharray="3 3" stroke="#234E7E" />
            <Tooltip contentStyle={{ backgroundColor: '#132F4C', border: 'none' }} />
            <Area type="monotone" dataKey="value" stroke={ATTACK_COLORS[selectedAttackType]} fill="url(#colorValue)" />
          </AreaChart>
        );
      case 'phishing':
        return (
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#234E7E" />
            <XAxis type="number" dataKey="x" stroke="#fff" />
            <YAxis type="number" dataKey="y" stroke="#fff" />
            <ZAxis type="number" dataKey="z" range={[50, 400]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#132F4C', border: 'none' }} />
            <Scatter data={scatterData} fill={ATTACK_COLORS[selectedAttackType]} />
          </ScatterChart>
        );
      case 'sqlinjection':
          return (
            <LineChart width={300} height={250} data={[
              { time: 'Jan', value: attackData.sqlinjection * 0.5 },
              { time: 'Feb', value: attackData.sqlinjection * 0.7 },
              { time: 'Mar', value: attackData.sqlinjection * 1.0 },
              { time: 'Apr', value: attackData.sqlinjection * 1.3 },
              { time: 'May', value: attackData.sqlinjection * 1.5 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#234E7E" />
              <XAxis dataKey="time" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ backgroundColor: '#132F4C', border: 'none' }} />
              <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} />
            </LineChart>
        );
      case 'Deepfake':
          return (
            <RadarChart outerRadius={120} width={350} height={400} data={[
              { metric: 'Image', value: attackData.Deepfake * 0.9 },
              { metric: 'Video', value: attackData.Deepfake * 0.7 },
              { metric: 'Audio', value: attackData.Deepfake * 0.5 },
            ]}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" stroke="#fff" />
              <PolarRadiusAxis stroke="#ccc" />
              <Radar name="Deepfake Detection" dataKey="value" stroke="#F97316" fill="#F97316" fillOpacity={0.6} />
            </RadarChart>
        );
      case 'Aadhaar':
          return (
            <BarChart width={300} height={250} data={[
              { name: 'Data Breach', value: attackData.Aadhaar * 0.4 },
              { name: 'Identity Theft', value: attackData.Aadhaar * 0.3 },
              { name: 'Fake KYC', value: attackData.Aadhaar * 0.2 },
              { name: 'Biometric Spoofing', value: attackData.Aadhaar * 0.1 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#234E7E" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ backgroundColor: '#132F4C', border: 'none' }} />
              <Bar type="monotone" dataKey="value" stroke="#10B981" fill="#10B981" fillOpacity={0.5} />
            </BarChart>
        );
        case 'ransomware':
          return (
            <Treemap 
              width={300} 
              height={250} 
              data={[
                { name: 'Initial Intrusion', value: attackData.ransomware * 0.5, fill: '#F87171' },
                { name: 'Encryption Started', value: attackData.ransomware * 0.8, fill: '#FBBF24' },
                { name: 'Data Exfiltration', value: attackData.ransomware * 1.2, fill: '#34D399' },
                { name: 'Ransom Demand', value: attackData.ransomware * 1.5, fill: '#60A5FA' },
              ]}
              dataKey="value"
              ratio={4 / 3}
              stroke="#fff"
              fill="#8884d8"
            >
              <Tooltip contentStyle={{ backgroundColor: '#132F4C', border: 'none' }} />
            </Treemap>
          );
      default:
        return (
          <AreaChart data={[
            { name: 'Real-time', value: attackData[selectedAttackType] },
            { name: 'Historical', value: Math.floor(attackData[selectedAttackType] * 0.8) },
            { name: 'Predicted', value: Math.floor(attackData[selectedAttackType] * 1.2) },
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#234E7E" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip contentStyle={{ backgroundColor: '#132F4C', border: 'none' }} />
            <Area dataKey="value" fill={ATTACK_COLORS[selectedAttackType]} />
          </AreaChart>
        );
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#0F2942] to-[#1A4067] text-white">
      <header className="bg-gradient-to-r from-[#132F4C] to-[#1A4067] border-b border-[#234E7E] sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Shield className="h-10 w-10 text-[#2065D1] animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
                  Aegies Guard
                </h1>
              </div>
              <div className="hidden md:flex space-x-4">
                <span className="text-cyan-300 flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Active Threats: {threatScore}
                </span>
                <span className="text-green-400 flex items-center">
                  <Server className="h-4 w-4 mr-2" />
                  Systems: 1,432
                </span>
                <span className="text-yellow-400 flex items-center">
                  <Siren className="h-4 w-4 mr-2" />
                  Alerts: 247
                </span>
              </div>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowAIInsights(!showAIInsights)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-[#2065D1] to-[#1E88E5] rounded-lg hover:from-[#1E88E5] hover:to-[#2065D1] transition shadow-lg shadow-blue-500/20"
              >
                <Brain className="h-4 w-4 mr-2" />
                AI Insights
              </button>
              <button className={`flex items-center px-4 py-2 rounded-lg transition shadow-lg ${
                threatLevel === 'HIGH' ? 'bg-gradient-to-r from-red-600 to-red-700 animate-pulse shadow-red-500/20' : 
                threatLevel === 'MEDIUM' ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 shadow-yellow-500/20' : 
                'bg-gradient-to-r from-green-600 to-green-700 shadow-green-500/20'
              }`}>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Threat Level: {threatLevel}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Attacks', value: '24,789', icon: Zap, color: 'cyan' },
            { title: 'Systems Online', value: '1,432', icon: Server, color: 'green' },
            { title: 'Active Threats', value: threatScore, icon: Lock, color: 'yellow' },
            { title: 'Users Protected', value: '89,421', icon: UserCheck, color: 'purple' },
          ].map(({ title, value, icon: Icon, color }) => (
            <div key={title} className="bg-gradient-to-br from-[#132F4C] to-[#1A4067] p-6 rounded-xl shadow-lg shadow-blue-500/5 hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-${color}-300 mb-1`}>{title}</p>
                  <h3 className="text-2xl font-bold">{value}</h3>
                </div>
                <Icon className={`h-8 w-8 text-${color}-300`} />
              </div>
            </div>
          ))}
        </div>

        {/* AI Analysis and Global Map */}
        <div className="bg-gradient-to-br from-[#132F4C] to-[#1A4067] p-6 rounded-xl shadow-lg shadow-blue-500/5 mb-8">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center text-cyan-300">
                <Brain className="h-6 w-6 mr-2" />
                AI Threat Analysis
              </h2>
              <div className="h-[400px] bg-[#0A1929] rounded-lg p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeSeriesData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2065D1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#2065D1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00AB55" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#00AB55" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <CartesianGrid strokeDasharray="3 3" stroke="#234E7E" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#132F4C', border: 'none' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#2065D1" 
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                      name="Current"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="predictedValue" 
                      stroke="#00AB55" 
                      fillOpacity={0.3} 
                      fill="url(#colorPredicted)" 
                      name="Predicted"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
  <h2 className="text-xl font-semibold mb-4 flex items-center text-cyan-300">
    <Globe className="h-6 w-6 mr-2" />
    Global Threat Map
  </h2>
  <div className="h-[400px] bg-[#0A1929] rounded-lg p-4 relative overflow-hidden">
    <img 
      src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
      alt="World Map"
      className="w-full h-full object-cover rounded-lg opacity-30"
    />
    {/* Enhanced threat indicators */}
    {[
      { top: "20%", left: "35%", color: "red", size: "medium" },
      { top: "30%", right: "60%", color: "red", size: "medium" },
      { bottom: "35%", right: "65%", color: "red", size: "large" },
      { top: "25%", left: "45%", color: "red", size: "small" },
      { bottom: "10%", left: "50%", color: "red", size: "medium" },
      { bottom: "20%", left: "20%", color: "red", size: "medium" },
      { bottom: "25%", left: "25%", color: "green", size: "medium" },

    ].map((indicator, index) => (
      <div
        key={index}
        className="absolute"
        style={{
          top: indicator.top,
          left: indicator.left,
          right: indicator.right,
          bottom: indicator.bottom,
        }}
      >
        {/* Outer animated ping effect */}
        <div className={`w-${indicator.size === 'large' ? '4' : indicator.size === 'medium' ? '4' : '2'} h-${indicator.size === 'large' ? '6' : indicator.size === 'medium' ? '4' : '2'} 
          bg-${indicator.color}-500 rounded-full animate-ping opacity-75`} 
        />
        {/* Static dot */}
        <div className={`absolute top-0 left-0 w-${indicator.size === 'large' ? '6' : indicator.size === 'medium' ? '4' : '2'} h-${indicator.size === 'large' ? '6' : indicator.size === 'medium' ? '4' : '2'}
          bg-${indicator.color}-500 rounded-full`} 
        />
      </div>
    ))}
  </div>
</div>
</div>
</div>
{/* Critical Alerts with Enhanced Visualization */}
<div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Critical Alerts</h3>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-400">Live Updates</span>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { 
                  severity: 'Critical',
                  message: 'Potential data exfiltration detected',
                  time: '2m ago',
                  details: 'Large outbound data transfer to unknown IP',
                  impact: 'High',
                  confidence: 95
                },
                {
                  severity: 'High',
                  message: 'Brute force attack in progress',
                  time: '5m ago',
                  details: 'Multiple failed admin login attempts',
                  impact: 'Medium',
                  confidence: 88
                },
                {
                  severity: 'Critical',
                  message: 'Zero-day exploit attempted',
                  time: '8m ago',
                  details: 'Unknown pattern detected in network traffic',
                  impact: 'High',
                  confidence: 92
                },
                {
                  severity: 'High',
                  message: 'Ransomware signature detected',
                  time: '15m ago',
                  details: 'Malicious encryption pattern identified',
                  impact: 'High',
                  confidence: 87
                },
              ].map((alert, index) => (
                <div key={index} className="p-4 bg-gray-900/30 rounded-lg border-l-4 border-red-500">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`h-2 w-2 rounded-full ${
                        alert.severity === 'Critical' ? 'bg-red-500' : 'bg-yellow-500'
                      }`} />
                      <span className="font-medium">{alert.message}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-700">
                        {alert.confidence}% confidence
                      </span>
                      <span className="text-xs text-gray-400">{alert.time}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{alert.details}</p>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-700">
                      Impact: {alert.impact}
                    </span>
                    <button className="text-xs text-blue-400 hover:text-blue-300">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        {/* Attack Distribution and Vectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#132F4C] to-[#1A4067] p-6 rounded-xl shadow-lg shadow-blue-500/5">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-cyan-300">
              <Network className="h-6 w-6 mr-2" />
              Attack Vectors
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(attackData).map(([attack, count]) => {
                const Icon = ATTACK_ICONS[attack as keyof typeof ATTACK_ICONS] || ShieldAlert;
                return (
                  <button
                    key={attack}
                    onClick={() => setSelectedAttackType(attack)}
                    className={`p-4 rounded-lg text-left transition-all ${
                      selectedAttackType === attack
                        ? `bg-gradient-to-r from-${ATTACK_COLORS[attack as keyof typeof ATTACK_COLORS]}/80 to-${ATTACK_COLORS[attack as keyof typeof ATTACK_COLORS]}/60 shadow-lg`
                        : 'bg-[#0A1929] hover:bg-[#1a365d]'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{attack.charAt(0).toUpperCase() + attack.slice(1)}</div>
                        <div className="text-sm opacity-70">{count} attacks</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#132F4C] to-[#1A4067] p-6 rounded-xl shadow-lg shadow-blue-500/5">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-cyan-300">
              <BarChart3 className="h-6 w-6 mr-2" />
              {selectedAttackType.charAt(0).toUpperCase() + selectedAttackType.slice(1)} Analysis
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                {getAttackTrendChart()}
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Insights Modal */}
        {showAIInsights && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-[#132F4C] to-[#1A4067] p-6 rounded-xl shadow-lg max-w-2xl w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-cyan-300">AI Threat Analysis Insights</h2>
                <button onClick={() => setShowAIInsights(false)} className="text-gray-400 hover:text-white">
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-[#0A1929] p-4 rounded-lg">
                  <h3 className="text-yellow-400 mb-2">Critical Findings</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Unusual spike in DDoS attacks from Asia-Pacific region</li>
                    <li>New ransomware variant detected in last 24 hours</li>
                    <li>Potential zero-day exploit targeting financial sector</li>
                  </ul>
                </div>
                <div className="bg-[#0A1929] p-4 rounded-lg">
                  <h3 className="text-green-400 mb-2">Recommendations</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Increase DDoS protection for APAC servers</li>
                    <li>Update ransomware signatures database</li>
                    <li>Deploy additional monitoring for financial systems</li>
                  </ul>
                </div>
                <div className="bg-[#0A1929] p-4 rounded-lg">
                  <h3 className="text-blue-400 mb-2">Predictive Analysis</h3>
                  <p>Based on current trends, we predict:</p>
                  <ul className="list-disc list-inside space-y-2 mt-2">
                    <li>15% increase in phishing attempts next week</li>
                    <li>Potential large-scale ransomware campaign</li>
                    <li>New attack vectors targeting cloud infrastructure</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
export default App;