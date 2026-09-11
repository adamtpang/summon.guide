import importlib.util
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location('reconcile', Path(__file__).with_name('reconcile-catalog.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class ReconciliationTests(unittest.TestCase):
    def test_episode_number_is_not_legacy_database_id(self):
        self.assertEqual(module.episode_links('https://www.founderspodcast.com/episodes/83044373/senra-324-rockefeller')[0][0], 324)
        self.assertEqual(module.episode_links('https://www.founderspodcast.com/episodes/83044373/senra-rockefeller'), [])

    def test_repeated_title_is_not_two_transcripts(self):
        rows = [dict(title='David Ogilvy', slug=str(n), episodeNumber=n, description='', durationMinutes=duration) for n, duration in [(306, 48), (89, 80)]]
        videos = [dict(id='video', title='David Ogilvy', url='https://youtube.com/watch?v=video', duration_min=48, description='')]
        result = module.reconcile(rows, videos)
        self.assertEqual([r['status'] for r in result], ['matched', 'review-repeated-book'])

    def test_copied_description_does_not_override_conflicting_identity(self):
        text = 'What I learned from reading Napoleon maxims and strategy with many detailed lessons for leaders.'
        rows = [dict(title='Napoleon Maxims', slug='337', episodeNumber=337, description=text, durationMinutes=60)]
        videos = [dict(id='video', title='Red Bull Dietrich Mateschitz', url='https://youtube.com/watch?v=video', duration_min=68, description=text+' https://www.founderspodcast.com/episodes/337-napoleon')]
        self.assertNotEqual(module.reconcile(rows, videos)[0]['status'], 'matched')


if __name__ == '__main__':
    unittest.main()
