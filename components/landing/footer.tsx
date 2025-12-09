import Link from "next/link"
import { Mail, Github, Twitter, Youtube, Instagram } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-foreground/5 border-t border-border py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="flex flex-col items-start">
                {/* Logo */}
                <Link href="/" className="block">
                    <div className="w-20 h-20 flex items-center justify-center overflow-hidden pm-25">
                        <img
                            src="/enwis.png"
                            alt="ENWIS"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </Link>

                {/* Description */}
                <p className="mt-3 text-muted-foreground text-sm leading-snug max-w-[200px]">
                    AI-powered vocabulary learning platform that remembers what you struggle with.
                </p>
            </div>


            <div>
                <h4 className="font-semibold text-foreground mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                    <Link href="#" className="hover:text-foreground smooth-transition">
                        Features
                    </Link>
                </li>
                <li>
                    <Link href="#" className="hover:text-foreground smooth-transition">
                        Pricing
                    </Link>
                </li>
                <li>
                    <Link href="#" className="hover:text-foreground smooth-transition">
                        FAQ
                    </Link>
                </li>
                </ul>
            </div>

            <div>
                <h4 className="font-semibold text-foreground mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                    <Link href="#" className="hover:text-foreground smooth-transition">
                        About
                    </Link>
                </li>
                <li>
                    <Link href="#" className="hover:text-foreground smooth-transition">
                        Blog
                    </Link>
                </li>
                <li>
                    <Link href="#" className="hover:text-foreground smooth-transition">
                        Careers
                    </Link>
                </li>
                </ul>
            </div>

            <div>
                <h4 className="font-semibold text-foreground mb-4">Connect</h4>
                <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-primary smooth-transition">
                    <Twitter size={20} />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary smooth-transition">
                    <Youtube size={20} />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary smooth-transition">
                    <Instagram size={20} />
                </Link>
                </div>
            </div>
            </div>

            <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2025 E N W I S. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
                <Link href="#" className="hover:text-foreground smooth-transition">
                Privacy Policy
                </Link>
                <Link href="#" className="hover:text-foreground smooth-transition">
                Terms of Service
                </Link>
            </div>
            </div>
        </div>
        </footer>
    )
}
