/**
 * Workflow Engine for Its Different Productions
 * Provides a flexible system for defining and executing automated workflows
 */

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'action' | 'condition' | 'parallel' | 'delay';
  config: Record<string, any>;
  onSuccess?: string; // Next step ID on success
  onFailure?: string; // Next step ID on failure
  retryCount?: number;
  timeout?: number; // in milliseconds
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  version: string;
  steps: WorkflowStep[];
  startStep: string;
  variables?: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  currentStep?: string;
  startTime: Date;
  endTime?: Date;
  variables: Record<string, any>;
  logs: WorkflowLog[];
  error?: string;
}

export interface WorkflowLog {
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'debug';
  stepId?: string;
  message: string;
  data?: any;
}

export type WorkflowActionHandler = (
  step: WorkflowStep,
  execution: WorkflowExecution,
  context: WorkflowContext
) => Promise<WorkflowActionResult>;

export interface WorkflowActionResult {
  success: boolean;
  data?: any;
  error?: string;
  nextStep?: string;
}

export interface WorkflowContext {
  engine: WorkflowEngine;
  logger: WorkflowLogger;
  variables: Record<string, any>;
  metadata: Record<string, any>;
}

export class WorkflowLogger {
  private logs: WorkflowLog[] = [];

  info(message: string, stepId?: string, data?: any) {
    this.addLog('info', message, stepId, data);
  }

  warn(message: string, stepId?: string, data?: any) {
    this.addLog('warn', message, stepId, data);
  }

  error(message: string, stepId?: string, data?: any) {
    this.addLog('error', message, stepId, data);
  }

  debug(message: string, stepId?: string, data?: any) {
    this.addLog('debug', message, stepId, data);
  }

  private addLog(level: WorkflowLog['level'], message: string, stepId?: string, data?: any) {
    this.logs.push({
      timestamp: new Date(),
      level,
      stepId,
      message,
      data,
    });
  }

  getLogs(): WorkflowLog[] {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }
}

export class WorkflowEngine {
  private workflows: Map<string, WorkflowDefinition> = new Map();
  private executions: Map<string, WorkflowExecution> = new Map();
  private actionHandlers: Map<string, WorkflowActionHandler> = new Map();

  constructor() {
    this.registerDefaultHandlers();
  }

  /**
   * Register a workflow definition
   */
  registerWorkflow(workflow: WorkflowDefinition) {
    this.workflows.set(workflow.id, workflow);
  }

  /**
   * Register an action handler
   */
  registerActionHandler(actionType: string, handler: WorkflowActionHandler) {
    this.actionHandlers.set(actionType, handler);
  }

  /**
   * Start a workflow execution
   */
  async startWorkflow(
    workflowId: string,
    variables: Record<string, any> = {},
    metadata: Record<string, any> = {}
  ): Promise<string> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow not found: ${workflowId}`);
    }

    const executionId = `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const execution: WorkflowExecution = {
      id: executionId,
      workflowId,
      status: 'pending',
      currentStep: workflow.startStep,
      startTime: new Date(),
      variables: { ...workflow.variables, ...variables },
      logs: [],
    };

    this.executions.set(executionId, execution);

    // Start execution asynchronously
    this.executeWorkflow(executionId).catch((error) => {
      console.error(`Workflow execution failed: ${executionId}`, error);
    });

    return executionId;
  }

  /**
   * Get workflow execution status
   */
  getExecution(executionId: string): WorkflowExecution | undefined {
    return this.executions.get(executionId);
  }

  /**
   * Cancel a workflow execution
   */
  async cancelWorkflow(executionId: string): Promise<boolean> {
    const execution = this.executions.get(executionId);
    if (!execution || execution.status === 'completed' || execution.status === 'failed') {
      return false;
    }

    execution.status = 'cancelled';
    execution.endTime = new Date();
    return true;
  }

  /**
   * Execute a workflow
   */
  private async executeWorkflow(executionId: string) {
    const execution = this.executions.get(executionId);
    if (!execution) {
      throw new Error(`Execution not found: ${executionId}`);
    }

    const workflow = this.workflows.get(execution.workflowId);
    if (!workflow) {
      throw new Error(`Workflow not found: ${execution.workflowId}`);
    }

    execution.status = 'running';
    const logger = new WorkflowLogger();
    const context: WorkflowContext = {
      engine: this,
      logger,
      variables: execution.variables,
      metadata: execution.metadata || {},
    };

    logger.info(`Starting workflow execution: ${workflow.name}`, undefined, {
      workflowId: workflow.id,
      executionId,
    });

    try {
      let currentStepId = execution.currentStep;

      while (currentStepId && execution.status === 'running') {
        const step = workflow.steps.find(s => s.id === currentStepId);
        if (!step) {
          throw new Error(`Step not found: ${currentStepId}`);
        }

        execution.currentStep = currentStepId;
        logger.info(`Executing step: ${step.name}`, step.id);

        try {
          const result = await this.executeStep(step, execution, context);
          
          if (result.success) {
            logger.info(`Step completed successfully: ${step.name}`, step.id, result.data);
            currentStepId = result.nextStep || step.onSuccess;
          } else {
            logger.error(`Step failed: ${step.name}`, step.id, result.error);
            currentStepId = step.onFailure;
            
            if (!currentStepId) {
              throw new Error(result.error || 'Step failed without error message');
            }
          }
        } catch (error) {
          logger.error(`Step execution error: ${step.name}`, step.id, error);
          currentStepId = step.onFailure;
          
          if (!currentStepId) {
            throw error;
          }
        }
      }

      if (execution.status === 'running') {
        execution.status = 'completed';
        execution.endTime = new Date();
        logger.info('Workflow completed successfully');
      }
    } catch (error) {
      execution.status = 'failed';
      execution.endTime = new Date();
      execution.error = error instanceof Error ? error.message : String(error);
      logger.error('Workflow execution failed', undefined, error);
    }

    execution.logs = logger.getLogs();
  }

  /**
   * Execute a single workflow step
   */
  private async executeStep(
    step: WorkflowStep,
    execution: WorkflowExecution,
    context: WorkflowContext
  ): Promise<WorkflowActionResult> {
    const handler = this.actionHandlers.get(step.type);
    if (!handler) {
      throw new Error(`No handler registered for step type: ${step.type}`);
    }

    // Apply timeout if specified
    if (step.timeout) {
      return Promise.race([
        handler(step, execution, context),
        new Promise<WorkflowActionResult>((_, reject) =>
          setTimeout(() => reject(new Error('Step timeout')), step.timeout)
        ),
      ]);
    }

    return handler(step, execution, context);
  }

  /**
   * Register default action handlers
   */
  private registerDefaultHandlers() {
    // Delay handler
    this.registerActionHandler('delay', async (step) => {
      const duration = step.config.duration || 1000;
      await new Promise(resolve => setTimeout(resolve, duration));
      return { success: true };
    });

    // Condition handler
    this.registerActionHandler('condition', async (step, execution, context) => {
      const condition = step.config.condition;
      const variables = context.variables;
      
      // Simple condition evaluation (can be enhanced with a proper expression parser)
      let result = false;
      try {
        // This is a simplified condition evaluator
        // In production, use a proper expression parser
        result = new Function('variables', `return ${condition}`)(variables);
      } catch (error) {
        return { success: false, error: `Condition evaluation failed: ${error}` };
      }

      return {
        success: true,
        nextStep: result ? step.config.trueStep : step.config.falseStep,
      };
    });

    // Log handler
    this.registerActionHandler('log', async (step, execution, context) => {
      const message = step.config.message || 'Log step executed';
      const level = step.config.level || 'info';
      
      context.logger[level as keyof WorkflowLogger](message, step.id, step.config.data);
      
      return { success: true };
    });

    // Variable assignment handler
    this.registerActionHandler('assign', async (step, execution, context) => {
      const assignments = step.config.assignments || {};
      
      for (const [key, value] of Object.entries(assignments)) {
        context.variables[key] = value;
      }
      
      return { success: true };
    });
  }
}
