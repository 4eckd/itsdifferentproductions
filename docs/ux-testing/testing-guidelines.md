Here's a landing page React component for your A/B/C logo test. It features:

* A 2x3 logo grid with selection
* A voting system with results display
* Reward logic placeholder for \~\$0.25 crypto faucet per participant

Let me know if you want to connect it to a crypto faucet (e.g. Solana via Phantom, USDC tipbot, or a backend trigger).


```tsx
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const logos = [
  { id: 'A1', src: '/logos/a1.png', label: 'A1 - Solana Spark' },
  { id: 'A2', src: '/logos/a2.png', label: 'A2 - Digital Quill' },
  { id: 'B1', src: '/logos/b1.png', label: 'B1 - Chain Palette' },
  { id: 'B2', src: '/logos/b2.png', label: 'B2 - Canvas Cube' },
  { id: 'C1', src: '/logos/c1.png', label: 'C1 - Infinity Loop' },
  { id: 'C2', src: '/logos/c2.png', label: 'C2 - Pixel Bloom' },
];

export default function LogoTest() {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [voteCounts, setVoteCounts] = useState(
    Object.fromEntries(logos.map((logo) => [logo.id, 0]))
  );

  const handleVote = () => {
    if (!selected) return;
    setVoteCounts((prev) => ({
      ...prev,
      [selected]: prev[selected] + 1,
    }));
    setSubmitted(true);
    // TODO: Trigger payout (e.g. .25 USDC/SOL faucet)
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Support Creators - Logo A/B/C Test</h1>
      <p className="text-center text-muted mb-8">
        Help us choose the best logo and get rewarded with a small crypto drop!
      </p>

      <div className="grid grid-cols-3 gap-4">
        {logos.map((logo) => (
          <Card
            key={logo.id}
            className={`cursor-pointer ${selected === logo.id ? 'border-primary' : ''}`}
            onClick={() => setSelected(logo.id)}
          >
            <CardContent className="flex flex-col items-center p-4">
              <img src={logo.src} alt={logo.label} className="h-32 mb-2" />
              <p>{logo.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {!submitted ? (
        <div className="text-center mt-6">
          <Button onClick={handleVote} disabled={!selected}>
            Submit Your Vote
          </Button>
        </div>
      ) : (
        <div className="text-center mt-6">
          <p className="font-semibold text-green-600 mb-2">
            Thank you for voting! You'll receive your reward shortly.
          </p>
          <h2 className="text-xl font-bold mb-4">Current Results:</h2>
          <div className="space-y-2">
            {logos.map((logo) => (
              <div key={logo.id}>
                <p>{logo.label}</p>
                <Progress value={voteCounts[logo.id]} max={Math.max(...Object.values(voteCounts)) || 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```