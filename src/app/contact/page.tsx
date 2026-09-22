'use client';

import React, { useState } from 'react';
import { PROFILE } from '@/data/profile';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  CheckCircle2,
  FileText,
  Clock,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate brief client submission and mailto fallback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      const mailtoUrl = `mailto:${PROFILE.contact.email}?subject=${encodeURIComponent(
        `[Contact Portfolio] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="pfa" size="md" className="gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
            <span>{PROFILE.badge}</span>
          </Badge>
          <Badge variant="neutral" size="md">
            Disponible pour stage
          </Badge>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Entrons en Contact
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
            Vous recherchez un stagiaire ingénieur rigoureux pour un projet à fort enjeu Data Analysis, Data Engineering ou Machine Learning ? Discutons-en.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: Direct info (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          
          {/* Contact Details Card */}
          <div className="p-6 rounded-card bg-white border border-slate-200/90 shadow-card space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Coordonnées Directes
            </h2>

            <div className="space-y-4 text-sm">
              <a
                href={`mailto:${PROFILE.contact.email}`}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-primary-50 text-slate-700 hover:text-primary-700 transition-colors border border-slate-100"
              >
                <Mail className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-slate-900">Email</span>
                  <span className="text-xs break-all">{PROFILE.contact.email}</span>
                </div>
              </a>

              <a
                href={PROFILE.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-primary-50 text-slate-700 hover:text-primary-700 transition-colors border border-slate-100"
              >
                <Linkedin className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-slate-900">LinkedIn</span>
                  <span className="text-xs">Profil professionnel</span>
                </div>
              </a>

              <a
                href={PROFILE.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-primary-50 text-slate-700 hover:text-primary-700 transition-colors border border-slate-100"
              >
                <Github className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-slate-900">GitHub</span>
                  <span className="text-xs">Dépôts & projets open source</span>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 text-slate-700 border border-slate-100">
                <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-slate-900">Mobilité</span>
                  <span className="text-xs">{PROFILE.contact.location}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <Button
                href={PROFILE.contact.cvPath}
                isExternal
                variant="outline"
                size="md"
                leftIcon={<FileText className="w-4 h-4 text-slate-500" />}
                className="w-full justify-center"
              >
                Télécharger mon CV (PDF)
              </Button>
            </div>

          </div>

          {/* Quick statement */}
          <div className="p-4 rounded-xl bg-accent-50/70 border border-accent-200/70 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-accent-900">
              <ShieldCheck className="w-4 h-4 text-accent-700" />
              <span>Engagement de réponse</span>
            </div>
            <p className="text-xs text-accent-800 leading-relaxed">
              Je réponds généralement sous 24 à 48 heures aux propositions de stage et d&apos;échange technique.
            </p>
          </div>

        </div>

        {/* Right Column: Contact Form (7 cols) */}
        <div className="md:col-span-7">
          <div className="p-6 sm:p-8 rounded-card bg-white border border-slate-200/90 shadow-card">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-accent-100 text-accent-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-heading font-bold text-slate-900">
                    Message préparé avec succès !
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                    Votre client mail par défaut s&apos;est ouvert pour envoyer le message. Vous pouvez également m&apos;écrire directement à {PROFILE.contact.email}.
                  </p>
                </div>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  size="sm"
                >
                  Envoyer un autre message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-base font-heading font-bold text-slate-900">
                  Formulaire de Message Direct
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700" htmlFor="name">
                      Votre nom / Entreprise *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="ex: Marie Dupont (Entreprise X)"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700" htmlFor="email">
                      Votre adresse email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="ex: marie.dupont@entreprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700" htmlFor="subject">
                    Objet de votre demande *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    placeholder="ex: Opportunité de Stage PFA 2e Année - Data Analysis"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700" htmlFor="message">
                    Votre message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Décrivez votre besoin, le contexte de la mission ou les sujets techniques envisagés..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-slate-50 focus:bg-white transition-all resize-y"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    rightIcon={<Send className="w-4 h-4" />}
                    className="w-full justify-center"
                  >
                    {isSubmitting ? 'Préparation...' : 'Envoyer le message'}
                  </Button>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}

