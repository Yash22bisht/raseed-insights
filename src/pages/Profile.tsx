import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Link2,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  ChevronRight,
  Moon,
  Sun,
  Globe,
  DollarSign,
  RefreshCw,
  Cloud,
  Smartphone,
  Download,
  Trash2,
  MessageSquare,
  Info,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const Profile = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [integrations, setIntegrations] = useState({
    gmail: true,
    googleWallet: false,
    whatsapp: false,
    cloudBackup: true,
  });
  const [notifications, setNotifications] = useState({
    spending: true,
    budget: true,
    returns: true,
    subscriptions: false,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="rounded-full hover:bg-muted/50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Profile & Settings</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-4 max-w-2xl mx-auto">
        {/* User Profile Card */}
        <Card className="glass-card border-border/50 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-4 border-primary/20">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Yash" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl">
                  Y
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">Yash Patel</h2>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  yash@example.com
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Phone className="w-4 h-4" />
                  +91 98765 43210
                </p>
              </div>
            </div>
            <Button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary">
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Integrations & Connected Accounts */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Link2 className="w-5 h-5 text-primary" />
              <CardTitle>Integrations</CardTitle>
            </div>
            <CardDescription>Manage connected accounts and sync</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <Mail className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="font-medium">Gmail Sync</p>
                  <p className="text-xs text-muted-foreground">Auto-import receipts</p>
                </div>
              </div>
              <Switch
                checked={integrations.gmail}
                onCheckedChange={(checked) =>
                  setIntegrations({ ...integrations, gmail: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <DollarSign className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">Google Wallet</p>
                  <p className="text-xs text-muted-foreground">Sync payments</p>
                </div>
              </div>
              <Switch
                checked={integrations.googleWallet}
                onCheckedChange={(checked) =>
                  setIntegrations({ ...integrations, googleWallet: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <MessageSquare className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">WhatsApp Business</p>
                  <p className="text-xs text-muted-foreground">Receipt messages</p>
                </div>
              </div>
              <Switch
                checked={integrations.whatsapp}
                onCheckedChange={(checked) =>
                  setIntegrations({ ...integrations, whatsapp: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Cloud className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium">Cloud Backup</p>
                  <p className="text-xs text-muted-foreground">Auto-backup data</p>
                </div>
              </div>
              <Switch
                checked={integrations.cloudBackup}
                onCheckedChange={(checked) =>
                  setIntegrations({ ...integrations, cloudBackup: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              <CardTitle>App Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === "dark" ? (
                  <Moon className="w-5 h-5 text-primary" />
                ) : (
                  <Sun className="w-5 h-5 text-primary" />
                )}
                <div>
                  <p className="font-medium">Theme</p>
                  <p className="text-xs text-muted-foreground">
                    {theme === "dark" ? "Dark Mode" : "Light Mode"}
                  </p>
                </div>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>

            <Separator />

            <Button
              variant="ghost"
              className="w-full justify-between hover:bg-muted/50"
              onClick={() => {}}
            >
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-muted-foreground" />
                <div className="text-left">
                  <p className="font-medium">Refresh Interval</p>
                  <p className="text-xs text-muted-foreground">Every 5 minutes</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-between hover:bg-muted/50"
              onClick={() => {}}
            >
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <div className="text-left">
                  <p className="font-medium">Language</p>
                  <p className="text-xs text-muted-foreground">English</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-between hover:bg-muted/50"
              onClick={() => {}}
            >
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-muted-foreground" />
                <div className="text-left">
                  <p className="font-medium">Currency</p>
                  <p className="text-xs text-muted-foreground">INR (₹)</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Button>
          </CardContent>
        </Card>

        {/* Notifications Settings */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Manage alert preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Spending Alerts</p>
                <p className="text-xs text-muted-foreground">Daily spending notifications</p>
              </div>
              <Switch
                checked={notifications.spending}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, spending: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Budget Reminders</p>
                <p className="text-xs text-muted-foreground">When nearing limits</p>
              </div>
              <Switch
                checked={notifications.budget}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, budget: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Return/Warranty</p>
                <p className="text-xs text-muted-foreground">Expiry reminders</p>
              </div>
              <Switch
                checked={notifications.returns}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, returns: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Subscription Alerts</p>
                <p className="text-xs text-muted-foreground">Renewal notifications</p>
              </div>
              <Switch
                checked={notifications.subscriptions}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, subscriptions: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <CardTitle>Privacy & Security</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-between hover:bg-muted/50"
              onClick={() => {}}
            >
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-muted-foreground" />
                <span>Manage Devices</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-between hover:bg-muted/50"
              onClick={() => {}}
            >
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <span>Two-Step Verification</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-between hover:bg-muted/50"
              onClick={() => {}}
            >
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-muted-foreground" />
                <span>Download My Data</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Button>

            <Separator className="my-2" />

            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => {}}
            >
              <Trash2 className="w-5 h-5 mr-3" />
              Delete Account
            </Button>
          </CardContent>
        </Card>

        {/* Help & Support */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              <CardTitle>Help & Support</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-between hover:bg-muted/50"
              onClick={() => {}}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-muted-foreground" />
                <span>FAQs</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-between hover:bg-muted/50"
              onClick={() => {}}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-muted-foreground" />
                <span>Contact Support</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-between hover:bg-muted/50"
              onClick={() => {}}
            >
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-muted-foreground" />
                <span>About Project Raseed</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Button>

            <div className="pt-4 text-center">
              <p className="text-xs text-muted-foreground">Version 1.0.0</p>
              <p className="text-xs text-muted-foreground mt-1">
                Made with ❤️ by Raseed Team
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
