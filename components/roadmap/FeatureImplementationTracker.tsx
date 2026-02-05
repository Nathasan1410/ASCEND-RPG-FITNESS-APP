import { TrendingUp, CheckCircle2, Clock, Calendar, Cpu, Database, ExternalLink, PlayCircle, Image } from "lucide-react";
import { type FeatureDetail } from "../feature-details-data";
import { cn } from "@/lib/utils/cn";

interface FeatureImplementationTrackerProps {
  feature: FeatureDetail;
}

export function FeatureImplementationTracker({ feature }: FeatureImplementationTrackerProps) {
  const statusColor = () => {
    switch (feature.implementation.status) {
      case 'On Track': return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'Delayed': return 'text-red-400 border-red-400/30 bg-red-400/10';
      case 'Ahead': return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
    }
  };

  return (
    <section className="bg-void-deep/50 border border-white/10 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          Implementation Tracker
        </h2>
        <span className={cn("px-3 py-1 rounded-lg text-sm font-bold uppercase border", statusColor())}>
          {feature.implementation.status}
        </span>
      </div>

      {/* Overall Progress */}
      <div className="bg-gradient-to-r from-green-500/5 to-emerald-500/5 border border-green-500/20 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-green-400 mb-1">Overall Progress</div>
            <div className="text-3xl font-bold text-white">{feature.implementation.overallProgress}%</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/60 mb-1">Est. Completion</div>
            <div className="text-lg font-bold text-white">{feature.implementation.estimatedCompletion}</div>
          </div>
        </div>
        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-400 rounded-full transition-all"
            style={{ width: `${feature.implementation.overallProgress}%` }}
          />
        </div>
      </div>

      {/* Implementation Phases */}
      <div className="space-y-6 mb-8">
        <h3 className="text-lg font-bold text-white mb-4">Implementation Phases</h3>
        {feature.implementation.phases.map((phase) => (
          <ImplementationPhase key={phase.id} phase={phase} />
        ))}
      </div>

      {/* Tasks/Steps */}
      <div className="border-t border-white/10 pt-6 mb-8">
        <h3 className="text-lg font-bold text-white mb-4">Implementation Tasks</h3>
        <div className="space-y-3">
          {feature.implementation.tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>

      {/* Technical Details */}
      <div className="border-t border-white/10 pt-6 mb-8">
        <h3 className="text-lg font-bold text-white mb-4">Technical Details</h3>
        <TechnicalDetails technical={feature.implementation.technical} />
      </div>

      {/* Demo/Preview */}
      {feature.implementation.demo?.available && (
        <div className="border-t border-white/10 pt-6">
          <h3 className="text-lg font-bold text-white mb-4">Demo & Preview</h3>
          <DemoPreview demo={feature.implementation.demo} />
        </div>
      )}

      {/* No Demo Available */}
      {!feature.implementation.demo?.available && (
        <div className="border-t border-white/10 pt-6">
          <div className="flex items-center gap-2 text-white/60">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Demo will be available once this feature is implemented</span>
          </div>
        </div>
      )}
    </section>
  );
}

interface ImplementationPhaseProps {
  phase: {
    id: string;
    name: string;
    status: 'completed' | 'in_progress' | 'pending';
    progress: number;
    completedDate?: string;
  };
}

function ImplementationPhase({ phase }: ImplementationPhaseProps) {
  const getStatusColor = () => {
    switch (phase.status) {
      case 'completed': return 'text-green-400';
      case 'in_progress': return 'text-yellow-400';
      case 'pending': return 'text-white/40';
    }
  };

  const getBarColor = () => {
    switch (phase.status) {
      case 'completed': return 'bg-green-400';
      case 'in_progress': return 'bg-yellow-400';
      case 'pending': return 'bg-white/20';
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={getStatusColor()}>
            {phase.status === 'completed' && <CheckCircle2 className="w-5 h-5" />}
            {phase.status === 'in_progress' && <TrendingUp className="w-5 h-5" />}
            {phase.status === 'pending' && <Clock className="w-5 h-5" />}
          </div>
          <div>
            <h4 className="font-bold text-white">{phase.name}</h4>
            {phase.completedDate && (
              <div className="text-sm text-green-400">Completed: {phase.completedDate}</div>
            )}
          </div>
        </div>
        <div className="text-right">
          <span className={cn("text-lg font-bold", getStatusColor())}>{phase.progress}%</span>
        </div>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", getBarColor())}
          style={{ width: `${phase.progress}%` }}
        />
      </div>
    </div>
  );
}

interface TaskItemProps {
  task: {
    id: string;
    name: string;
    status: 'completed' | 'in_progress' | 'pending';
    assignee?: string;
    dueDate?: string;
    estimatedHours?: number;
  };
}

function TaskItem({ task }: TaskItemProps) {
  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case 'in_progress': return <TrendingUp className="w-4 h-4 text-yellow-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-white/40" />;
    }
  };

  const getStatusColor = () => {
    switch (task.status) {
      case 'completed': return 'border-green-400/30 bg-green-400/5';
      case 'in_progress': return 'border-yellow-400/30 bg-yellow-400/5';
      case 'pending': return 'border-white/10 bg-white/5';
    }
  };

  return (
    <div className={cn("flex items-center gap-4 p-3 border rounded-lg", getStatusColor())}>
      <div className="flex-shrink-0">
        {getStatusIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-white truncate">{task.name}</h4>
        <div className="flex items-center gap-4 text-xs text-white/60">
          {task.assignee && <span>Assignee: {task.assignee}</span>}
          {task.dueDate && <span>Due: {task.dueDate}</span>}
          {task.estimatedHours && <span>Est: {task.estimatedHours}h</span>}
        </div>
      </div>
    </div>
  );
}

interface TechnicalDetailsProps {
  technical: {
    technologies: string[];
    apiEndpoints: string[];
    databaseChanges: string[];
    documentation: string[];
  };
}

function TechnicalDetails({ technical }: TechnicalDetailsProps) {
  return (
    <div className="space-y-4">
      {/* Technologies */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Cpu className="w-4 h-4 text-system-cyan" />
          <h4 className="text-sm font-bold text-white">Technologies</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {technical.technologies.map((tech, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-system-cyan/10 text-system-cyan rounded border border-system-cyan/20">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* API Endpoints */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <ExternalLink className="w-4 h-4 text-system-cyan" />
          <h4 className="text-sm font-bold text-white">API Endpoints</h4>
        </div>
        <div className="space-y-1">
          {technical.apiEndpoints.map((endpoint, index) => (
            <code key={index} className="block text-xs bg-white/5 px-3 py-2 rounded text-white/70 font-mono">
              {endpoint}
            </code>
          ))}
        </div>
      </div>

      {/* Database Changes */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Database className="w-4 h-4 text-system-cyan" />
          <h4 className="text-sm font-bold text-white">Database Changes</h4>
        </div>
        <ul className="space-y-1">
          {technical.databaseChanges.map((change, index) => (
            <li key={index} className="text-xs text-white/70 flex items-start gap-2">
              <span className="text-system-cyan">•</span>
              <span>{change}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Documentation */}
      {technical.documentation.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ExternalLink className="w-4 h-4 text-system-cyan" />
            <h4 className="text-sm font-bold text-white">Documentation</h4>
          </div>
          <ul className="space-y-1">
            {technical.documentation.map((doc, index) => (
              <li key={index} className="text-xs text-white/70 flex items-start gap-2">
                <span className="text-system-cyan">•</span>
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

interface DemoPreviewProps {
  demo: {
    available: boolean;
    liveDemo?: string;
    screenshots?: string[];
    video?: string;
    testAccount?: {
      email: string;
      password: string;
      description: string;
    };
  };
}

function DemoPreview({ demo }: DemoPreviewProps) {
  return (
    <div className="space-y-4">
      {/* Test Account */}
      {demo.testAccount && (
        <div className="bg-gradient-to-r from-system-cyan/5 to-blue-600/5 border border-system-cyan/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-system-cyan" />
            <h4 className="font-bold text-white">Test Account</h4>
          </div>
          <p className="text-sm text-white/70 mb-3">{demo.testAccount.description}</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/60">Email:</span>
              <code className="text-sm bg-white/10 px-2 py-1 rounded text-white">{demo.testAccount.email}</code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/60">Password:</span>
              <code className="text-sm bg-white/10 px-2 py-1 rounded text-white">{demo.testAccount.password}</code>
            </div>
          </div>
        </div>
      )}

      {/* Live Demo */}
      {demo.liveDemo && (
        <a
          href={demo.liveDemo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-system-cyan hover:bg-system-cyan/90 text-void-deep rounded-lg font-bold transition-all"
        >
          <PlayCircle className="w-4 h-4" />
          Try Live Demo
          <ExternalLink className="w-4 h-4" />
        </a>
      )}

      {/* Screenshots */}
      {demo.screenshots && demo.screenshots.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Image className="w-5 h-5 text-system-cyan" />
            <h4 className="font-bold text-white">Screenshots</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demo.screenshots.map((screenshot, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-2">
                <img
                  src={screenshot}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full rounded"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Video */}
      {demo.video && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <PlayCircle className="w-5 h-5 text-system-cyan" />
            <h4 className="font-bold text-white">Demo Video</h4>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
            <video controls className="w-full">
              <source src={demo.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
