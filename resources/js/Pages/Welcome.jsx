import { Head, Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { 
    FileText, 
    Users, 
    Shield, 
    BarChart3, 
    CheckCircle, 
    Clock,
    Award,
    Lock,
    TrendingUp,
    Settings,
    ArrowRight,
    Zap,
    Target,
    Eye,
    X,
    ChevronDown,
    Sparkles
} from 'lucide-react';

export default function Welcome({ auth }) {
    const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState({});
    const [currentSlide, setCurrentSlide] = useState(0);
    const observerRef = useRef(null);

    // Scroll handler for parallax and sticky nav
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Auto-rotate carousel every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 4);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Intersection Observer for scroll-triggered animations
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible((prev) => ({
                            ...prev,
                            [entry.target.id]: true,
                        }));
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );

        // Observe all sections
        const sections = document.querySelectorAll('[data-animate]');
        sections.forEach((section) => {
            if (observerRef.current) {
                observerRef.current.observe(section);
            }
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);
    
    const features = [
        {
            icon: FileText,
            title: "Easy IPCRF Submission",
            description: "Submit your Individual Performance Commitment and Review Forms digitally with a simple, intuitive interface. Track your submissions in real-time.",
            color: "bg-[#1a5f3a]"
        },
        {
            icon: TrendingUp,
            title: "Track Your Growth",
            description: "Monitor your professional development journey with detailed performance insights and personalized feedback on your achievements.",
            color: "bg-[#fbbf24]"
        },
        {
            icon: Award,
            title: "Career Advancement",
            description: "Access your promotion history, view eligibility status, and track your path to career advancement with transparent evaluation criteria.",
            color: "bg-[#1a5f3a]"
        },
        {
            icon: Target,
            title: "Goal Setting & KRAs",
            description: "Set clear Key Result Areas and objectives aligned with DepEd standards. Receive guidance on achieving your professional goals.",
            color: "bg-[#fbbf24]"
        },
        {
            icon: BarChart3,
            title: "Performance Dashboard",
            description: "View your performance ratings, submission history, and evaluation results in one comprehensive, easy-to-understand dashboard.",
            color: "bg-[#1a5f3a]"
        },
        {
            icon: CheckCircle,
            title: "Instant Notifications",
            description: "Stay informed with real-time updates on submission status, evaluation results, and important deadlines. Never miss an opportunity.",
            color: "bg-[#fbbf24]"
        }
    ];

    const benefits = [
        {
            title: "Save Time",
            description: "Submit your IPCRF documents in minutes, not hours. No more paperwork or manual filing.",
            icon: Clock,
            stat: "90%",
            statLabel: "Time Saved"
        },
        {
            title: "Stay Organized",
            description: "All your documents, ratings, and feedback in one secure, accessible location.",
            icon: FileText,
            stat: "100%",
            statLabel: "Digital"
        },
        {
            title: "Grow Your Career",
            description: "Clear visibility into your performance helps you identify strengths and areas for improvement.",
            icon: TrendingUp,
            stat: "24/7",
            statLabel: "Access"
        }
    ];

    const workflow = [
        {
            step: "1",
            title: "Create Account",
            description: "Get your credentials from your school administrator",
            icon: Users
        },
        {
            step: "2",
            title: "Upload Documents",
            description: "Submit your IPCRF forms digitally with ease",
            icon: FileText
        },
        {
            step: "3",
            title: "Track Progress",
            description: "Monitor your submission status in real-time",
            icon: Clock
        },
        {
            step: "4",
            title: "View Results",
            description: "Access your ratings and feedback instantly",
            icon: Award
        }
    ];

    return (
        <>
            <Head title="Welcome to ISAT DMS" />
            
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
                {/* Navigation - Enhanced with glassmorphism and smooth transitions */}
                <nav 
                    className={`bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 ${
                        scrollY > 50 ? 'shadow-lg' : ''
                    }`}
                    style={{
                        transform: scrollY > 50 ? 'translateY(0)' : 'translateY(0)',
                    }}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center gap-3 group cursor-pointer">
                                <div className="relative">
                                    <img 
                                        src="/pictures/isat 1.jpg" 
                                        alt="ISAT Logo" 
                                        className="h-10 w-10 rounded-lg object-cover transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                                    />
                                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-green-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-green-600">
                                        ISAT DMS
                                    </h1>
                                    <p className="text-xs text-gray-600">Document Management System</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="group inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-[#1a5f3a] to-[#1a5f3a]/90 text-white rounded-lg hover:from-[#1a5f3a]/90 hover:to-[#1a5f3a] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                    >
                                        Go to Dashboard
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="group px-6 py-2.5 bg-gradient-to-r from-[#1a5f3a] to-[#1a5f3a]/90 text-white rounded-lg hover:from-[#1a5f3a]/90 hover:to-[#1a5f3a] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                    >
                                        Log in
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section - Enhanced with parallax */}
                <section 
                    className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center"
                    id="hero"
                    data-animate
                >
                    {/* Background Decoration with parallax */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div 
                            className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1a5f3a]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"
                            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
                        ></div>
                        <div 
                            className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#fbbf24]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"
                            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
                        ></div>
                        <div 
                            className="absolute bottom-0 left-1/2 w-[600px] h-[600px] bg-[#1a5f3a]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"
                            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
                        ></div>
                    </div>

                    <div className="max-w-7xl mx-auto relative w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            {/* Left Content - Enhanced animations */}
                            <div className="text-left space-y-8 animate-fade-in">
                                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#1a5f3a]/10 to-[#fbbf24]/10 text-[#1a5f3a] rounded-full text-sm font-semibold border border-[#1a5f3a]/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
                                    <Sparkles className="h-4 w-4 animate-pulse" />
                                    For Teachers, By Educators
                                </div>
                                
                                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
                                    Empower Your
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1a5f3a] via-[#fbbf24] to-[#1a5f3a] mt-3 animate-gradient bg-size-200">
                                        Teaching Career
                                    </span>
                                </h1>
                                
                                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-xl">
                                    Digital IPCRF submission and performance tracking made simple. 
                                    Focus on teaching while we handle your professional documentation.
                                </p>
                                
                                <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
                                    {!auth.user ? (
                                        <Link
                                            href={route('login')}
                                            className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-[#1a5f3a] to-[#1a5f3a]/90 text-white rounded-2xl hover:from-[#1a5f3a]/90 hover:to-[#1a5f3a] transition-all transform hover:scale-105 hover:shadow-2xl font-bold text-lg overflow-hidden"
                                        >
                                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#fbbf24]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                            <span className="relative">Start Your Journey</span>
                                            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform relative" />
                                        </Link>
                                    ) : (
                                        <Link
                                            href={route('dashboard')}
                                            className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-[#1a5f3a] to-[#1a5f3a]/90 text-white rounded-2xl hover:from-[#1a5f3a]/90 hover:to-[#1a5f3a] transition-all transform hover:scale-105 hover:shadow-2xl font-bold text-lg overflow-hidden"
                                        >
                                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#fbbf24]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                            <span className="relative">Go to My Dashboard</span>
                                            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform relative" />
                                        </Link>
                                    )}
                                </div>
                                
                                {/* Trust indicators */}
                                <div className="flex items-center gap-8 pt-8 border-t border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                        <span className="text-sm font-medium text-gray-700">Secure & Reliable</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                        <span className="text-sm font-medium text-gray-700">Easy to Use</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Content - Enhanced with 3D effect */}
                            <div className="relative animate-fade-in animation-delay-400">
                                <div className="relative">
                                    {/* Main Image Container with glassmorphism */}
                                    <div className="relative bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500 border border-white/50">
                                        <div className="relative overflow-hidden rounded-2xl shadow-xl">
                                            <img 
                                                src="/pictures/isat 1.jpg" 
                                                alt="ISAT" 
                                                className="w-full h-auto transition-transform duration-700 hover:scale-110"
                                                loading="eager"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                                        </div>
                                        
                                        {/* Floating Badge */}
                                        <div className="absolute -top-4 -right-4 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] text-white px-6 py-3 rounded-2xl shadow-2xl animate-float">
                                            <div className="flex items-center gap-2">
                                                <Award className="h-5 w-5" />
                                                <span className="font-bold text-sm">Excellence in Education</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vision, Mission, Goals, Objectives Carousel */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-[#1a5f3a]/5 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#1a5f3a]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#fbbf24]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
                    
                    <div className="max-w-6xl mx-auto relative z-10">
                        <div className="text-center mb-16 space-y-4">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a5f3a]/10 text-[#1a5f3a] rounded-full text-sm font-semibold border border-[#1a5f3a]/20">
                                <Target className="h-4 w-4" />
                                Our Foundation
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                                About ISAT
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Our commitment to excellence in technical education and workforce development
                            </p>
                        </div>

                        {/* Carousel Container */}
                        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                            {/* Slides */}
                            <div className="relative h-[550px] md:h-[650px]">
                                {/* Vision Slide */}
                                <div className={`absolute inset-0 transition-all duration-700 ${currentSlide === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                    <div className="h-full bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 p-10 md:p-16 flex flex-col justify-center">
                                        <div className="flex items-center gap-5 mb-10">
                                            <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shadow-2xl">
                                                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-5xl md:text-6xl font-extrabold text-green-900">VISION</h3>
                                        </div>
                                        <p className="text-gray-800 leading-relaxed text-2xl md:text-3xl font-medium max-w-4xl">
                                            A center of excellence geared towards developing Filipino workforce that initiates 
                                            transformational approaches receptive to the changing needs of time.
                                        </p>
                                    </div>
                                </div>

                                {/* Mission Slide */}
                                <div className={`absolute inset-0 transition-all duration-700 ${currentSlide === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                    <div className="h-full bg-gradient-to-br from-teal-50 via-teal-100 to-cyan-50 p-10 md:p-16 flex flex-col justify-center">
                                        <div className="flex items-center gap-5 mb-10">
                                            <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center shadow-2xl">
                                                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-5xl md:text-6xl font-extrabold text-teal-900">MISSION</h3>
                                        </div>
                                        <p className="text-gray-800 leading-relaxed text-2xl md:text-3xl font-medium max-w-4xl">
                                            ISAT commits to produce highly skilled workforce with positive work values and green 
                                            skills through quality training, innovative research and responsive community engagement.
                                        </p>
                                    </div>
                                </div>

                                {/* Goals Slide */}
                                <div className={`absolute inset-0 transition-all duration-700 ${currentSlide === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                    <div className="h-full bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 p-10 md:p-16 overflow-y-auto custom-scrollbar">
                                        <div className="flex items-center gap-5 mb-10">
                                            <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center shadow-2xl">
                                                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-5xl md:text-6xl font-extrabold text-amber-900">GOALS</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            {[
                                                "Continuously commit to service excellence in skills training",
                                                "Extend skills training opportunities to more people",
                                                "Strengthen linkages with industries",
                                                "Strengthen stakeholder's linkages",
                                                "Improve capability in income generating projects",
                                                "Greening ISAT",
                                                "Construction of new training laboratories",
                                                "Implement flexible learning delivery"
                                            ].map((goal, index) => (
                                                <div key={index} className="flex gap-4 bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                                    <div className="flex-shrink-0">
                                                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-base font-bold shadow-lg">
                                                            {index + 1}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-800 text-lg leading-relaxed font-medium">{goal}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Objectives Slide */}
                                <div className={`absolute inset-0 transition-all duration-700 ${currentSlide === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                    <div className="h-full bg-gradient-to-br from-sky-50 via-blue-50 to-sky-50 p-10 md:p-16 overflow-y-auto custom-scrollbar">
                                        <div className="flex items-center gap-5 mb-10">
                                            <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-sky-600 to-blue-600 flex items-center justify-center shadow-2xl">
                                                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-5xl md:text-6xl font-extrabold text-sky-900">OBJECTIVES</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            {[
                                                "Strive for excellence in skills training",
                                                "Upgrade programs for global competence",
                                                "Conduct TVET research",
                                                "Produce globally competitive trainees",
                                                "Conduct skills training in identified areas",
                                                "Produce globally competitive skilled workforce",
                                                "Establish strong stakeholder relationships",
                                                "Encourage trainers to venture into IGP"
                                            ].map((objective, index) => (
                                                <div key={index} className="flex gap-4 bg-white/70 backdrop-blur-sm p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                                    <div className="flex-shrink-0">
                                                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center text-white text-base font-bold shadow-lg">
                                                            {index + 1}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-800 text-lg leading-relaxed font-medium">{objective}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Dots */}
                            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                                {[0, 1, 2, 3].map((index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`h-3 rounded-full transition-all duration-300 ${
                                            currentSlide === index 
                                                ? 'bg-[#1a5f3a] w-10' 
                                                : 'bg-gray-300 hover:bg-gray-400 w-3'
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={() => setCurrentSlide((prev) => (prev - 1 + 4) % 4)}
                                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-10 border border-gray-100"
                                aria-label="Previous slide"
                            >
                                <svg className="h-6 w-6 text-[#1a5f3a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setCurrentSlide((prev) => (prev + 1) % 4)}
                                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-10 border border-gray-100"
                                aria-label="Next slide"
                            >
                                <svg className="h-6 w-6 text-[#1a5f3a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>

                {/* ISAT Buildings Section */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-[#1a5f3a]/5 to-white relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-96 h-96 bg-[#fbbf24]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1a5f3a]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
                    
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-16 space-y-4">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fbbf24]/10 text-[#1a5f3a] rounded-full text-sm font-semibold border border-[#fbbf24]/30">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                Our Facilities
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                                ISAT Buildings & Facilities
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                State-of-the-art infrastructure designed for excellence in technical education
                            </p>
                        </div>

                        {/* Buildings Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Building 1 */}
                            <div className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                <div className="relative h-80 overflow-hidden">
                                    <img 
                                        src="/pictures/pic1.jpg" 
                                        alt="ISAT Building" 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                                </div>
                            </div>

                            {/* Building 2 */}
                            <div className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                <div className="relative h-80 overflow-hidden">
                                    <img 
                                        src="/pictures/pic2.jpg" 
                                        alt="ISAT Building" 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                                </div>
                            </div>

                            {/* Building 3 */}
                            <div className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                <div className="relative h-80 overflow-hidden">
                                    <img 
                                        src="/pictures/pic3.jpg" 
                                        alt="ISAT Building" 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                                </div>
                            </div>

                            {/* Building 4 */}
                            <div className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                <div className="relative h-80 overflow-hidden">
                                    <img 
                                        src="/pictures/pic4.jpg" 
                                        alt="ISAT Building" 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                                </div>
                            </div>

                            {/* Building 5 */}
                            <div className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                <div className="relative h-80 overflow-hidden">
                                    <img 
                                        src="/pictures/pic5.jpg" 
                                        alt="ISAT Building" 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                                </div>
                            </div>

                            {/* Building 6 */}
                            <div className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                <div className="relative h-80 overflow-hidden">
                                    <img 
                                        src="/pictures/pic6.jpg" 
                                        alt="ISAT Building" 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <img 
                                        src="/pictures/isat 1.jpg" 
                                        alt="ISAT Logo" 
                                        className="h-10 w-10 rounded-lg object-cover"
                                    />
                                    <div>
                                        <h3 className="text-white font-bold">ISAT DMS</h3>
                                        <p className="text-xs text-gray-400">Document Management System</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400">
                                    Empowering educational institutions with efficient document management and performance evaluation tools.
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href={route('login')} className="hover:text-white transition-colors">Login</Link></li>
                                    {auth.user && (
                                        <li><Link href={route('dashboard')} className="hover:text-white transition-colors">Dashboard</Link></li>
                                    )}
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="text-white font-semibold mb-4">System Info</h4>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        Secure & Encrypted
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        Role-Based Access
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        Audit Trail Enabled
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-800 pt-8 text-center text-sm">
                            <p>&copy; {new Date().getFullYear()} ISAT Document Management System. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Learn More Modal - Enhanced */}
            {isLearnMoreOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        {/* Background overlay with blur */}
                        <div 
                            className="fixed inset-0 transition-all duration-300 bg-gray-900/80 backdrop-blur-sm"
                            onClick={() => setIsLearnMoreOpen(false)}
                            style={{ animation: 'fade-in 0.3s ease-out' }}
                        ></div>

                        {/* Modal panel with scale animation */}
                        <div 
                            className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
                            style={{ animation: 'scale-in 0.3s ease-out' }}
                        >
                            {/* Header - Enhanced */}
                            <div className="bg-gradient-to-r from-[#1a5f3a] via-[#fbbf24] to-[#1a5f3a] px-6 py-6 relative overflow-hidden">
                                {/* Animated background pattern */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
                                </div>
                                
                                <div className="flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="relative group">
                                            <img 
                                                src="/pictures/isat 1.jpg" 
                                                alt="ISAT Logo" 
                                                className="h-12 w-12 rounded-lg object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white">About ISAT</h3>
                                            <p className="text-green-100 text-sm">Vision, Mission, Goals & Objectives</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsLearnMoreOpen(false)}
                                        className="text-white hover:text-gray-200 transition-all duration-300 hover:rotate-90 hover:scale-110 p-2 rounded-lg hover:bg-white/10"
                                        aria-label="Close modal"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
                                <div className="space-y-8">
                                    {/* Vision */}
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Eye className="h-5 w-5 text-white" />
                                            </div>
                                            <h4 className="text-xl font-bold text-blue-900">VISION</h4>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed pl-13">
                                            "A center of excellence geared towards developing Filipino workforce that initiates transformational approaches receptive to the changing needs of time."
                                        </p>
                                    </div>

                                    {/* Mission */}
                                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Target className="h-5 w-5 text-white" />
                                            </div>
                                            <h4 className="text-xl font-bold text-green-900">MISSION</h4>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed pl-13">
                                            "ISAT commits to produce highly skilled workforce with positive work values and green skills through quality training, innovative research and responsive community engagement."
                                        </p>
                                    </div>

                                    {/* Goals */}
                                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Award className="h-5 w-5 text-white" />
                                            </div>
                                            <h4 className="text-xl font-bold text-purple-900">GOALS</h4>
                                        </div>
                                        <ul className="space-y-2 pl-13">
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                                <span>Continuously commit to service excellence in skills training in all registered qualifications/programs</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                                <span>Extend skills training opportunities to a greater number of people</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                                <span>Intensify and strengthen linkages with industries known for their international standards</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                                <span>Intensify and strengthen stakeholder's linkages</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                                <span>Improve capability in income generating project production and entrepreneurship</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                                <span>Greening ISAT</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                                <span>Construction of new training laboratories</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                                <span>Implement flexible learning delivery</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Objectives */}
                                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <TrendingUp className="h-5 w-5 text-white" />
                                            </div>
                                            <h4 className="text-xl font-bold text-orange-900">OBJECTIVES</h4>
                                        </div>
                                        <ul className="space-y-2 pl-13">
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <ArrowRight className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                <span>To strive for excellence in skills training strategy</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <ArrowRight className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                <span>To upgrade programs in skills training for trainers to be globally competent</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <ArrowRight className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                <span>To conduct TVET research</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <ArrowRight className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                <span>To produce globally competitive trainees</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <ArrowRight className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                <span>To conduct skills training to be identified areas</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <ArrowRight className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                <span>To produce globally competitive skilled workforce</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <ArrowRight className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                <span>To establish a strong relationship with different stakeholders of the school</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <ArrowRight className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                <span>To encourage trainers of all qualifications to venture into IGP</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <ArrowRight className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                <span>To serve quality and different variety of products</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <ArrowRight className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                <span>To achieve 100% ARTA/CUSAT positive comments on services and products</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <ArrowRight className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                <span>To increase the marketability of products and services</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <ArrowRight className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                <span>To re-orient existing education programs to address sustainable development</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <ArrowRight className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                <span>Construct additional training laboratories that conforms to the international standards</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <ArrowRight className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                <span>Offer programs relevant to the new normal situation/condition and in demand in the locality</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-gray-700">
                                                <ArrowRight className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                <span>Continues implementation of disrupted programs</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Footer - Enhanced */}
                            <div className="bg-gradient-to-r from-gray-50 to-[#fbbf24]/10 px-6 py-4 border-t border-gray-200">
                                <button
                                    onClick={() => setIsLearnMoreOpen(false)}
                                    className="group w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#1a5f3a] to-[#1a5f3a]/90 text-white rounded-lg hover:from-[#1a5f3a]/90 hover:to-[#1a5f3a] transition-all font-semibold transform hover:scale-105 hover:shadow-lg relative overflow-hidden"
                                >
                                    <span className="absolute inset-0 w-full h-full bg-[#fbbf24]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                    <span className="relative">Close</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                /* Performance-optimized animations using GPU acceleration */
                @keyframes blob {
                    0% { 
                        transform: translate3d(0px, 0px, 0) scale(1);
                    }
                    33% { 
                        transform: translate3d(30px, -50px, 0) scale(1.1);
                    }
                    66% { 
                        transform: translate3d(-20px, 20px, 0) scale(0.9);
                    }
                    100% { 
                        transform: translate3d(0px, 0px, 0) scale(1);
                    }
                }
                
                .animate-blob {
                    animation: blob 7s infinite;
                    will-change: transform;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                
                @keyframes float {
                    0%, 100% { 
                        transform: translateY(0px) translateZ(0);
                    }
                    50% { 
                        transform: translateY(-20px) translateZ(0);
                    }
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                    will-change: transform;
                }
                
                @keyframes fade-in {
                    from { 
                        opacity: 0;
                        transform: translateZ(0);
                    }
                    to { 
                        opacity: 1;
                        transform: translateZ(0);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }
                
                @keyframes slide-up {
                    from { 
                        opacity: 0;
                        transform: translate3d(0, 30px, 0);
                    }
                    to { 
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }
                
                .animate-slide-up {
                    animation: slide-up 0.6s ease-out forwards;
                    will-change: transform, opacity;
                }
                
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translate3d(0, 40px, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                    will-change: transform, opacity;
                }
                
                @keyframes gradient {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }
                
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
                
                .animation-delay-200 {
                    animation-delay: 0.2s;
                    opacity: 0;
                }
                
                .animation-delay-400 {
                    animation-delay: 0.4s;
                    opacity: 0;
                }
                
                .animation-delay-600 {
                    animation-delay: 0.6s;
                    opacity: 0;
                }
                
                /* 3D perspective for cards */
                .perspective-1000 {
                    perspective: 1000px;
                }
                
                /* Smooth scroll behavior */
                html {
                    scroll-behavior: smooth;
                }
                
                /* Accessibility: Respect user's motion preferences */
                @media (prefers-reduced-motion: reduce) {
                    *,
                    *::before,
                    *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                        scroll-behavior: auto !important;
                    }
                    
                    .animate-blob,
                    .animate-float,
                    .animate-pulse,
                    .animate-bounce {
                        animation: none !important;
                    }
                }
                
                /* Loading optimization */
                img {
                    content-visibility: auto;
                }
                
                /* GPU acceleration hints */
                .transform,
                .transition-transform,
                .hover\\:scale-105,
                .hover\\:scale-110,
                .group-hover\\:scale-110 {
                    will-change: transform;
                }
                
                /* Remove will-change after animation completes */
                .animate-fade-in,
                .animate-slide-up,
                .animate-fade-in-up {
                    animation-fill-mode: forwards;
                }
                
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                
                /* Focus visible for accessibility */
                *:focus-visible {
                    outline: 2px solid #1a5f3a;
                    outline-offset: 2px;
                    border-radius: 4px;
                }
                
                /* High contrast mode support */
                @media (prefers-contrast: high) {
                    .bg-gradient-to-r,
                    .bg-gradient-to-br {
                        background: #1a5f3a !important;
                    }
                }
                
                /* Modal animations */
                @keyframes scale-in {
                    from {
                        opacity: 0;
                        transform: scale(0.95) translateZ(0);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateZ(0);
                    }
                }
                
                @keyframes shimmer {
                    from {
                        transform: translateX(-100%);
                    }
                    to {
                        transform: translateX(100%);
                    }
                }
                
                .animate-shimmer {
                    animation: shimmer 3s infinite;
                }
            `}</style>
            
            {/* Scroll to top button */}
            {scrollY > 500 && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 z-40 p-4 bg-gradient-to-r from-[#1a5f3a] to-[#1a5f3a]/90 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 animate-fade-in group"
                    aria-label="Scroll to top"
                >
                    <ChevronDown className="h-6 w-6 rotate-180 group-hover:-translate-y-1 transition-transform duration-300" />
                </button>
            )}
        </>
    );
}
